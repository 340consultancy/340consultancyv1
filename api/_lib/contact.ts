import { z } from 'zod';
import { brevoConfigured, fail, OK, subscribeToBrevo, type ApiResult, type BrevoEnv } from './brevo.js';

export interface ContactEnv extends BrevoEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

const optionalText = (max: number) => z.string().trim().max(max).optional().default('');

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  igHandle: optionalText(100),
  interest: optionalText(200),
  message: optionalText(5000),
  newsletter: z.boolean().optional().default(false),
  /** Honeypot: hidden from people, filled by bots. */
  website: z.string().optional(),
});

export async function handleContact(input: unknown, env: ContactEnv, fetchFn: typeof fetch = fetch): Promise<ApiResult> {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) return fail(500, 'not_configured');
  const parsed = schema.safeParse(input);
  if (!parsed.success) return fail(400, 'invalid_input');
  const f = parsed.data;
  if (f.website) return OK;

  // Plain-text email only: visitor input is never interpreted as HTML.
  const text = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Instagram: ${f.igHandle || '-'}`,
    `Interested in: ${f.interest || '-'}`,
    `Newsletter: ${f.newsletter ? 'yes' : 'no'}`,
    '',
    f.message || '(no message)',
  ].join('\n');

  const res = await fetchFn('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: f.email,
      subject: `New contact form message from ${f.name}`,
      text,
    }),
  });
  if (!res.ok) {
    console.error('[contact] Resend failed:', res.status, await res.text().catch(() => ''));
    return fail(502, 'upstream_failed');
  }

  if (f.newsletter && brevoConfigured(env)) {
    // The message already reached the owner: a newsletter failure must not
    // turn the visitor's submission into an error.
    await subscribeToBrevo(f.email, 'contact-form', env, fetchFn).catch((err) =>
      console.error('[contact] Brevo subscription failed:', err)
    );
  }
  return OK;
}
