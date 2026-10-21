// Converts the legacy plain-text article body (blank lines = paragraphs,
// "## " = subheading) into Portable Text — same rules as the old renderer.

export interface PtSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

export interface PtBlock {
  _type: 'block';
  _key: string;
  style: string;
  markDefs: unknown[];
  children: PtSpan[];
}

export function textToPortableText(body: string): PtBlock[] {
  const blocks: PtBlock[] = [];
  let paragraph: string[] = [];

  const push = (style: string, text: string) => {
    const key = `b${blocks.length}`;
    blocks.push({ _type: 'block', _key: key, style, markDefs: [], children: [{ _type: 'span', _key: `${key}s0`, text, marks: [] }] });
  };
  const flush = () => {
    if (paragraph.length === 0) return;
    push('normal', paragraph.join(' '));
    paragraph = [];
  };

  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim();
    if (line === '') {
      flush();
    } else if (line.startsWith('## ')) {
      flush();
      push('h2', line.slice(3));
    } else {
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}
