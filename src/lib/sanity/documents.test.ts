import { describe, it, expect } from 'vitest';
import { ALL_EXPORTS, CONTENT_TYPES, COLLECTIONS, SINGLETONS } from './documents';

describe('document map', () => {
  it('covers the 24 content exports exactly once', () => {
    expect(ALL_EXPORTS).toHaveLength(24);
    expect(new Set(ALL_EXPORTS).size).toBe(24);
  });

  it('declares 13 Sanity document types', () => {
    expect(CONTENT_TYPES).toHaveLength(13);
    expect(SINGLETONS).toHaveLength(9);
    expect(COLLECTIONS).toHaveLength(4);
  });

  it('gives every singleton either an export or a field list, never both', () => {
    for (const s of SINGLETONS) {
      expect(Boolean(s.export) !== Boolean(s.fields)).toBe(true);
    }
  });
});
