export interface BrevoEnv {
  BREVO_API_KEY?: string;
  BREVO_LIST_ID?: string;
}

export interface ApiResult {
  status: number;
  body: { ok: boolean; error?: string };
}

export const OK: ApiResult = { status: 200, body: { ok: true } };
export const fail = (status: number, error: string): ApiResult => ({ status, body: { ok: false, error } });

export const brevoConfigured = (env: BrevoEnv): boolean => Boolean(env.BREVO_API_KEY && env.BREVO_LIST_ID);

/** Add (or update) a contact in the Brevo list. 201 = created, 204 = already there. */
export async function subscribeToBrevo(email: string, source: string, env: BrevoEnv, fetchFn: typeof fetch = fetch): Promise<void> {
  const res = await fetchFn('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY ?? '', 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ email, listIds: [Number(env.BREVO_LIST_ID)], updateEnabled: true, attributes: { SOURCE: source } }),
  });
  if (!res.ok) throw new Error(`Brevo HTTP ${res.status}`);
}
