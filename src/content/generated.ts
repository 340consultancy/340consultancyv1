// Site content fetched from Sanity at build time (scripts/fetch-content.ts).
// The file is generated before `dev` and `build`; it is not committed.
import raw from './generated/content.json';

export const generated = raw as unknown as Record<string, unknown>;
