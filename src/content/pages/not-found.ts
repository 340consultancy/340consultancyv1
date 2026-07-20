// 404 / Not-found page (single type). Serializable text only.

export interface NotFoundContent {
  eyebrow: string;
  code: string;
  message: string;
  backLabel: string;
}

export const notFound: NotFoundContent = {
  eyebrow: 'Error 404',
  code: '404',
  message: "This page doesn't exist.",
  backLabel: 'Back to Home',
};
