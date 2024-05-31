/** Core */
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';

/** Database */
import { db } from '@/db/drizzle';
import { accounts } from '@/db/schema';

export const accountsRoutes = new Hono()
  .get(
    '/',
    clerkMiddleware(),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(eq(accounts.userId, auth.userId));

      return context.json({ data });
    },
  );
