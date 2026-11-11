import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { caseStudies, img } from '@/content';
import CaseStudyPage from './CaseStudyPage';

vi.mock('@/components/TopNav', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));
vi.mock('@/components/YesCTA', () => ({ default: () => null }));
vi.mock('framer-motion', async () => {
  const { createElement, forwardRef } = await import('react');
  const plainTag = (tag: string) => forwardRef<HTMLElement, Record<string, unknown>>(
    ({ initial, animate, transition, ...props }, ref) => createElement(tag, { ...props, ref }),
  );
  return { motion: { div: plainTag('div'), h1: plainTag('h1') }, useReducedMotion: () => true };
});

const originals = caseStudies.map((study) => ({ ...study }));

afterEach(() => {
  cleanup();
  caseStudies.forEach((study, index) => Object.assign(study, originals[index]));
});

function renderStudy(slug: string, visuals: unknown[], gallery: unknown[] = []) {
  const study = caseStudies.find((entry) => entry.slug === slug)!;
  Object.assign(study, { visuals, gallery });
  return render(
    <MemoryRouter initialEntries={[`/work/${slug}`]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/work/:slug" element={<CaseStudyPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('case study photos from partial CMS entries', () => {
  it('shows one editor upload at full width without a broken second image', () => {
    const upload = 'https://cms.340consultancy.com/uploads/editor-photo.png';
    const { container } = renderStudy('albanova', [upload], ['albanova-4']);
    const pair = container.querySelector('.cs-pair')!;
    const photos = pair.querySelectorAll('img');

    expect(photos).toHaveLength(1);
    expect(photos[0]).toHaveAttribute('src', upload);
    expect(getComputedStyle(photos[0].parentElement!).gridColumn).toBe('1 / -1');
    expect(getComputedStyle(photos[0].parentElement!).marginTop).toBe('0px');
  });

  it('omits the photo pair and fallback photo when no valid visuals are supplied', () => {
    const { container } = renderStudy('albanova', [' ', '', null, undefined]);

    expect(container.querySelector('.cs-pair')).not.toBeInTheDocument();
    expect(Array.from(container.querySelectorAll('img')).every((photo) => photo.getAttribute('src')?.trim())).toBe(true);
  });

  it('keeps both supplied photos in their original order', () => {
    const { container } = renderStudy('albanova', ['albanova-2', 'albanova-3']);
    const photos = container.querySelectorAll('.cs-pair img');

    expect(Array.from(photos, (photo) => photo.getAttribute('src'))).toEqual([img('albanova-2'), img('albanova-3')]);
  });

  it('keeps the removed Studio Displays landscape hidden with a single editor upload', () => {
    const upload = 'https://cms.340consultancy.com/uploads/studio-detail.png';
    const { container } = renderStudy('studio-displays', [upload], ['case-sd-workshop']);
    const sources = Array.from(container.querySelectorAll('img'), (photo) => photo.getAttribute('src'));

    expect(container.querySelectorAll('.cs-pair img')).toHaveLength(1);
    expect(sources.filter((source) => source === upload)).toHaveLength(1);
    expect(sources).not.toContain(img('case-sd-workshop'));
  });
});
