import { z } from 'zod';
import { brevoConfigured, fail, OK, subscribeToBrevo, type ApiResult, type BrevoEnv } from './brevo.js';

export interface ContactEnv extends BrevoEnv {
  CONTACT_TO_EMAIL?: string;
  /** Sender address, verified in Brevo (Senders & domains). */
  CONTACT_FROM_EMAIL?: string;
  CONTACT_FROM_NAME?: string;
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
  if (!env.BREVO_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) return fail(500, 'not_configured');
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

  // Brevo transactional email API (same account and key as the newsletter).
  const res = await fetchFn('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { name: env.CONTACT_FROM_NAME || '340 Consultancy website', email: env.CONTACT_FROM_EMAIL },
      to: [{ email: env.CONTACT_TO_EMAIL }],
      replyTo: { email: f.email, name: f.name },
      subject: `New contact form message from ${f.name}`,
      textContent: text,
    }),
  });
  if (!res.ok) {
    console.error('[contact] Brevo email failed:', res.status, await res.text().catch(() => ''));
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
