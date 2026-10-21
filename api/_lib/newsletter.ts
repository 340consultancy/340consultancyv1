import { z } from 'zod';
import { brevoConfigured, fail, OK, subscribeToBrevo, type ApiResult, type BrevoEnv } from './brevo.js';

const schema = z.object({
  email: z.string().trim().email().max(320),
  source: z.enum(['lead-magnet', 'newsletter']),
  /** Honeypot: hidden from people, filled by bots. */
  website: z.string().optional(),
});

export async function handleNewsletter(input: unknown, env: BrevoEnv, fetchFn: typeof fetch = fetch): Promise<ApiResult> {
  if (!brevoConfigured(env)) return fail(500, 'not_configured');
  const parsed = schema.safeParse(input);
  if (!parsed.success) return fail(400, 'invalid_input');
  if (parsed.data.website) return OK;
  try {
    await subscribeToBrevo(parsed.data.email, parsed.data.source, env, fetchFn);
    return OK;
  } catch (err) {
    console.error('[newsletter] Brevo failed:', err);
    return fail(502, 'upstream_failed');
  }
}
