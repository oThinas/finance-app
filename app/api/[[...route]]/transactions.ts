/** Core */
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { parse, subDays } from 'date-fns';
import { and, desc, eq, gte, inArray, lte, sql } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

/** Database */
import { db } from '@/db/drizzle';
import { accounts, categories, insertTransactionsSchema, transactions } from '@/db/schema';

export const transactionsRoutes = new Hono()
  .get(
    '/',
    zValidator('query', z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountId: z.string().optional(),
    })),
    clerkMiddleware(),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const { from, to, accountId } = context.req.valid('query');

      const defaultTo = new Date();
      const defaultFrom = subDays(defaultTo, 30);

      const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultFrom;
      const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo;

      const data = await db
        .select({
          id: transactions.id,
          date: transactions.date,
          category: categories.name,
          categoryId: transactions.categoryId,
          payee: transactions.payee,
          amount: transactions.amount,
          notes: transactions.notes,
          account: accounts.name,
          accountId: transactions.accountId,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(and(
          accountId ? eq(transactions.accountId, accountId) : undefined,
          eq(accounts.userId, auth.userId),
          gte(transactions.date, startDate),
          lte(transactions.date, endDate),
        ))
        .orderBy(desc(transactions.date));

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
          id: transactions.id,
          date: transactions.date,
          categoryId: transactions.categoryId,
          payee: transactions.payee,
          amount: transactions.amount,
          notes: transactions.notes,
          accountId: transactions.accountId,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .where(and(
          eq(transactions.id, id),
          eq(accounts.userId, auth.userId),
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
    zValidator('json', insertTransactionsSchema.omit({ id: true })),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const body = context.req.valid('json');

      const [data] = await db
        .insert(transactions)
        .values({
          id: createId(),
          ...body,
        })
        .returning();

      return context.json({ data });
    },
  )
  .post(
    '/bulk-create',
    clerkMiddleware(),
    zValidator('json', z.array(insertTransactionsSchema.omit({ id: true }))),
    async (context) => {
      const auth = getAuth(context);
      if (!auth?.userId) {
        return context.json({ error: 'Unauthorized' }, 401);
      }

      const body = context.req.valid('json');

      const data = await db
        .insert(transactions)
        .values(body.map((transaction) => ({
          id: createId(),
          ...transaction,
        })))
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

      const transactionsToDelete = db
        .$with('transactions_to_delete')
        .as(db.select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(
            inArray(transactions.id, body.ids),
            eq(accounts.userId, auth.userId),
          )));

      const data = await db
        .with(transactionsToDelete)
        .delete(transactions)
        .where(inArray(transactions.id, sql`(SELECT id FROM ${transactionsToDelete})`))
        .returning({ id: transactions.id });

      return context.json({ data });
    },
  )
  .patch(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    zValidator('json', insertTransactionsSchema.omit({ id: true })),
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

      const transactionsToUpdate = db
        .$with('transactions_to_update')
        .as(db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(
            eq(transactions.id, id),
            eq(accounts.userId, auth.userId),
          )));

      const [data] = await db
        .with(transactionsToUpdate)
        .update(transactions)
        .set(body)
        .where(inArray(transactions.id, sql`(SElECT id FROM ${transactionsToUpdate})`))
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

      const transactionsToDelete = db
        .$with('transactions_to_delete')
        .as(db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(
            eq(transactions.id, id),
            eq(accounts.userId, auth.userId),
          )));

      const [data] = await db
        .with(transactionsToDelete)
        .delete(transactions)
        .where(inArray(transactions.id, sql`(SELECT id FROM ${transactionsToDelete})`))
        .returning({ id: transactions.id });

      if (!data) {
        return context.json({ error: 'Not found' }, 404);
      }

      return context.json({ data });
    },
  );
