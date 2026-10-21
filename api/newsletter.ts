import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { BrevoEnv } from './_lib/brevo.js';
import { handleNewsletter } from './_lib/newsletter.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  const result = await handleNewsletter(req.body, process.env as BrevoEnv);
  return res.status(result.status).json(result.body);
}
