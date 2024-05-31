/** Core */
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';

/** Database */
import { db } from '@/db/drizzle';
import { accounts, insertAccountSchema } from '@/db/schema';

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
  )
  .post(
    '/',
    clerkMiddleware(),
    zValidator('json', insertAccountSchema.pick({ name: true })),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const body = context.req.valid('json');

      const [data] = await db
        .insert(accounts)
        .values({
          id: createId(),
          userId: auth.userId,
          ...body,
        })
        .returning();

      return context.json({ data });
    },
  );
