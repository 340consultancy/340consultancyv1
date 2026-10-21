import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticleBody from './ArticleBody';
import { textToPortableText } from '@/lib/sanity/portable-text';

describe('ArticleBody', () => {
  it('renders paragraphs and subheadings', () => {
    render(<ArticleBody body={textToPortableText('Intro paragraph\n\n## A heading\nFollow-up text')} />);
    expect(screen.getByRole('heading', { level: 2, name: 'A heading' })).toBeInTheDocument();
    expect(screen.getByText('Intro paragraph').tagName).toBe('P');
    expect(screen.getByText('Follow-up text').tagName).toBe('P');
  });

  it('renders links added in the Studio, opening in a new tab', () => {
    const body = [{
      _type: 'block' as const, _key: 'b0', style: 'normal',
      markDefs: [{ _type: 'link', _key: 'l1', href: 'https://example.com' }],
      children: [{ _type: 'span' as const, _key: 's0', text: 'Read more', marks: ['l1'] }],
    }];
    render(<ArticleBody body={body} />);
    const link = screen.getByRole('link', { name: 'Read more' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
