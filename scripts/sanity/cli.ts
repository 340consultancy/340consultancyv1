import { createClient, type SanityClient } from '@sanity/client';

export const SANITY_API_VERSION = '2025-01-01';

/** Load ./.env into process.env when present (local runs). On Vercel the
 *  variables already live in the real environment. */
export function loadDotEnv(): void {
  try {
    process.loadEnvFile('.env');
  } catch {
    // no .env file: rely on the real environment
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variable d'environnement manquante : ${name} (voir .env.example)`);
  return value;
}

/** `--name value` from the command line. */
export function argValue(name: string): string | undefined {
  const args = process.argv.slice(2);
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
}

/** Read-only client: published documents only, no token (public dataset). */
export function sanityReadClient(projectId: string, dataset: string): SanityClient {
  return createClient({ projectId, dataset, apiVersion: SANITY_API_VERSION, useCdn: false, perspective: 'published' });
}
