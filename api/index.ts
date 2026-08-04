import { startServer } from '../backend/server.ts';

const appPromise = startServer();

export default async function handler(req: any, res: any) {
  const app = await appPromise;

  // Preserve the original API path when Vercel routes to the function.
  if (req.query?.path) {
    req.url = `/api/${req.query.path}${req.url.includes('?') ? '' : ''}`;
  }

  return app(req, res);
}
