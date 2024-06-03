/** Core */
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { and, eq, inArray } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

/** Database */
import { db } from '@/db/drizzle';
import { categories, insertCategorySchema } from '@/db/schema';

export const categoriesRoute = new Hono()
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
          id: categories.id,
          name: categories.name,
        })
        .from(categories)
        .where(eq(categories.userId, auth.userId));

      return context.json({ data });
    },
  )
  .get(
    '/:id',
    zValidator('param', z.object({ id: z.string().optional() })),
    clerkMiddleware(),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const { id } = context.req.valid('param');
      if (!id) {
        return context.json({ error: 'Missing id' }, 400);
      }

      const [data] = await db
        .select({
          id: categories.id,
          name: categories.name,
        })
        .from(categories)
        .where(and(
          eq(categories.userId, auth.userId),
          eq(categories.id, id),
        ));

      if (!data) {
        return context.json({ error: 'Not found' }, 404);
      }

      return context.json({ data });
    },
  )
  .post(
    '/',
    clerkMiddleware(),
    zValidator('json', insertCategorySchema.pick({ name: true })),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const body = context.req.valid('json');

      const [data] = await db
        .insert(categories)
        .values({
          id: createId(),
          userId: auth.userId,
          ...body,
        })
        .returning();

      return context.json({ data });
    },
  )
  .post(
    '/bulk-delete',
    clerkMiddleware(),
    zValidator(
      'json',
      z.object({ ids: z.array(z.string()) }),
    ),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const body = context.req.valid('json');

      const data = await db
        .delete(categories)
        .where(and(
          eq(categories.userId, auth.userId),
          inArray(categories.id, body.ids),
        ))
        .returning({ id: categories.id });

      return context.json({ data });
    },
  )
  .patch(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    zValidator('json', insertCategorySchema.pick({ name: true })),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const { id } = context.req.valid('param');
      if (!id) {
        return context.json({ error: 'Missing id' }, 400);
      }

      const body = context.req.valid('json');

      const [data] = await db
        .update(categories)
        .set(body)
        .where(and(
          eq(categories.userId, auth.userId),
          eq(categories.id, id),
        ))
        .returning();

      if (!data) {
        return context.json({ error: 'Not found' }, 404);
      }

      return context.json({ data });
    },
  )
  .delete(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const { id } = context.req.valid('param');
      if (!id) {
        return context.json({ error: 'Missing id' }, 400);
      }

      const [data] = await db
        .delete(categories)
        .where(and(
          eq(categories.userId, auth.userId),
          eq(categories.id, id),
        ))
        .returning({ id: categories.id });

      if (!data) {
        return context.json({ error: 'Not found' }, 404);
      }

      return context.json({ data });
    },
  );
