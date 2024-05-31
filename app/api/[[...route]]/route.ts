/** Core */
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

/** Routes */
import { accountsRoutes } from './accounts';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

const routes = app
  .route('/accounts', accountsRoutes);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
