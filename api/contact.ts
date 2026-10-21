import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleContact, type ContactEnv } from './_lib/contact.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  const result = await handleContact(req.body, process.env as ContactEnv);
  return res.status(result.status).json(result.body);
}
