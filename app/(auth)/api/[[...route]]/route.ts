/** Core */
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app
  .get(
    '/hello',
    clerkMiddleware(),
    (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' });
      }

      return context.json({ meessage: 'Hello World!', userId: auth.userId });
    },
  );

export const GET = handle(app);
export const POST = handle(app);
