import { describe, it, expect } from 'vitest';
import { textToPortableText } from './portable-text';

const texts = (body: string) => textToPortableText(body).map((b) => [b.style, b.children[0].text]);

describe('textToPortableText', () => {
  it('splits paragraphs on blank lines and joins wrapped lines with a space', () => {
    expect(texts('First line\nsame paragraph\n\nSecond')).toEqual([
      ['normal', 'First line same paragraph'],
      ['normal', 'Second'],
    ]);
  });

  it('turns "## " lines into h2, even when a paragraph follows on the next line', () => {
    expect(texts('Intro\n\n## 1. Behind the scenes\nShow the messy middle.')).toEqual([
      ['normal', 'Intro'],
      ['h2', '1. Behind the scenes'],
      ['normal', 'Show the messy middle.'],
    ]);
  });

  it('produces valid Portable Text blocks with unique keys', () => {
    const blocks = textToPortableText('A\n\n## B\nC');
    expect(blocks[0]).toEqual({
      _type: 'block', _key: 'b0', style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: 'b0s0', text: 'A', marks: [] }],
    });
    expect(new Set(blocks.map((b) => b._key)).size).toBe(blocks.length);
  });

  it('returns no block for an empty body', () => {
    expect(textToPortableText('  \n\n ')).toEqual([]);
  });
});
