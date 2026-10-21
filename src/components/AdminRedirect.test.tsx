import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminRedirect from './AdminRedirect';

afterEach(() => vi.unstubAllEnvs());

describe('AdminRedirect', () => {
  it('sends editors to the Sanity Studio', () => {
    vi.stubEnv('VITE_SANITY_STUDIO_URL', 'https://340consultancy.sanity.studio/');
    const go = vi.fn();
    render(<MemoryRouter initialEntries={['/admin']}><AdminRedirect go={go} /></MemoryRouter>);
    expect(go).toHaveBeenCalledWith('https://340consultancy.sanity.studio');
  });

  it('falls back to the home page when no Studio is configured', () => {
    vi.stubEnv('VITE_SANITY_STUDIO_URL', '');
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/" element={<p>home</p>} />
          <Route path="/admin" element={<AdminRedirect go={vi.fn()} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('home')).toBeInTheDocument();
  });
});
