// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import { handleNewsletter } from './newsletter.js';

const env = { BREVO_API_KEY: 'key', BREVO_LIST_ID: '7' };
const ok = (status = 201) => vi.fn().mockResolvedValue(new Response(null, { status }));

describe('handleNewsletter', () => {
  it('adds the contact to the Brevo list with its source', async () => {
    const fetchFn = ok();
    const result = await handleNewsletter({ email: 'a@b.co', source: 'lead-magnet' }, env, fetchFn);
    expect(result).toEqual({ status: 200, body: { ok: true } });
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe('https://api.brevo.com/v3/contacts');
    expect(init.headers['api-key']).toBe('key');
    expect(JSON.parse(init.body)).toEqual({ email: 'a@b.co', listIds: [7], updateEnabled: true, attributes: { SOURCE: 'lead-magnet' } });
  });

  it('treats an already-subscribed address (204) as success', async () => {
    const result = await handleNewsletter({ email: 'a@b.co', source: 'newsletter' }, env, ok(204));
    expect(result.status).toBe(200);
  });

  it('silently accepts bots that fill the honeypot, without calling Brevo', async () => {
    const fetchFn = ok();
    const result = await handleNewsletter({ email: 'a@b.co', source: 'newsletter', website: 'spam.com' }, env, fetchFn);
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('rejects an invalid email or source', async () => {
    expect((await handleNewsletter({ email: 'nope', source: 'newsletter' }, env, ok())).status).toBe(400);
    expect((await handleNewsletter({ email: 'a@b.co', source: 'other' }, env, ok())).status).toBe(400);
  });

  it('reports a Brevo failure as 502', async () => {
    const result = await handleNewsletter({ email: 'a@b.co', source: 'newsletter' }, env, ok(500));
    expect(result).toEqual({ status: 502, body: { ok: false, error: 'upstream_failed' } });
  });

  it('reports missing configuration as 500', async () => {
    const result = await handleNewsletter({ email: 'a@b.co', source: 'newsletter' }, { BREVO_API_KEY: '', BREVO_LIST_ID: '' }, ok());
    expect(result).toEqual({ status: 500, body: { ok: false, error: 'not_configured' } });
  });
});
