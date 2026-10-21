// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { checkImportTarget } from './import-guard';

describe('checkImportTarget', () => {
  it('lets any import write to a non-production dataset', () => {
    expect(() => checkImportTarget('development', 'bundled', false)).not.toThrow();
    expect(() => checkImportTarget('development', 'strapi', false)).not.toThrow();
  });

  it('never writes the stale bundled content to production', () => {
    expect(() => checkImportTarget('production', 'bundled', true)).toThrow('production');
  });

  it('requires an explicit --overwrite to import Strapi into production', () => {
    expect(() => checkImportTarget('production', 'strapi', false)).toThrow('--overwrite');
    expect(() => checkImportTarget('production', 'strapi', true)).not.toThrow();
  });
});
