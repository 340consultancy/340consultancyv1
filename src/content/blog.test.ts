import { describe, it, expect } from 'vitest';
import { blogArticles } from '@/content';

describe('blogArticles', () => {
  it('stores the eyebrow in `category`, not in a misnamed `date` field', () => {
    expect(blogArticles.length).toBeGreaterThan(0);
    for (const article of blogArticles) {
      expect(article).not.toHaveProperty('date');
      expect(typeof article.category).toBe('string');
      expect(article.category.length).toBeGreaterThan(0);
    }
  });
});
