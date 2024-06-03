/** Core */
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

/** Routes */
import { accountsRoutes } from './accounts';
import { categoriesRoute } from './categories';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

const routes = app
  .route('/accounts', accountsRoutes)
  .route('/categories', categoriesRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
