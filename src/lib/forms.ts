/** POST a form to one of the site's Vercel functions; throws when it fails. */
export async function postForm(
  path: '/api/contact' | '/api/newsletter',
  payload: Record<string, unknown>
): Promise<void> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

/** Value of the hidden honeypot field of the submitted form. */
export const honeypot = (form: HTMLFormElement): string =>
  String(new FormData(form).get('website') ?? '');
