// 404 / Not-found page (single type). Serializable text only.

import { generated } from '@/content/generated';

export interface NotFoundContent {
  eyebrow: string;
  code: string;
  message: string;
  backLabel: string;
}

export const notFound = generated.notFound as NotFoundContent;
