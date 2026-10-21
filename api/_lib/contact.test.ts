// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import { handleContact } from './contact.js';

const env = {
  RESEND_API_KEY: 'rk', CONTACT_TO_EMAIL: 'owner@340.com', CONTACT_FROM_EMAIL: 'Site <site@340.com>',
  BREVO_API_KEY: 'bk', BREVO_LIST_ID: '7',
};
const valid = { name: 'Ann', email: 'ann@x.co', igHandle: '@ann', interest: 'Strategy', message: 'Hello', newsletter: false };
const respond = (...statuses: number[]) => {
  const fn = vi.fn();
  for (const s of statuses) fn.mockResolvedValueOnce(new Response('{}', { status: s }));
  return fn;
};

describe('handleContact', () => {
  it('emails the owner with the visitor as reply-to', async () => {
    const fetchFn = respond(200);
    expect(await handleContact(valid, env, fetchFn)).toEqual({ status: 200, body: { ok: true } });
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.headers.Authorization).toBe('Bearer rk');
    const sent = JSON.parse(init.body);
    expect(sent).toMatchObject({ from: 'Site <site@340.com>', to: ['owner@340.com'], reply_to: 'ann@x.co' });
    expect(sent.subject).toContain('Ann');
    expect(sent.text).toContain('Hello');
    expect(sent.text).toContain('@ann');
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('also subscribes the visitor when the newsletter box is ticked', async () => {
    const fetchFn = respond(200, 201);
    await handleContact({ ...valid, newsletter: true }, env, fetchFn);
    expect(fetchFn.mock.calls[1][0]).toBe('https://api.brevo.com/v3/contacts');
    expect(JSON.parse(fetchFn.mock.calls[1][1].body).attributes).toEqual({ SOURCE: 'contact-form' });
  });

  it('still succeeds when only the newsletter subscription fails', async () => {
    expect((await handleContact({ ...valid, newsletter: true }, env, respond(200, 500))).status).toBe(200);
  });

  it('silently accepts bots that fill the honeypot, without sending anything', async () => {
    const fetchFn = respond(200);
    expect(await handleContact({ ...valid, website: 'spam' }, env, fetchFn)).toEqual({ status: 200, body: { ok: true } });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('rejects a missing name or an invalid email', async () => {
    expect((await handleContact({ ...valid, name: ' ' }, env, respond(200))).status).toBe(400);
    expect((await handleContact({ ...valid, email: 'x' }, env, respond(200))).status).toBe(400);
  });

  it('reports a Resend failure as 502', async () => {
    expect(await handleContact(valid, env, respond(422))).toEqual({ status: 502, body: { ok: false, error: 'upstream_failed' } });
  });

  it('reports missing configuration as 500', async () => {
    expect((await handleContact(valid, { ...env, RESEND_API_KEY: '' }, respond(200))).status).toBe(500);
  });
});
