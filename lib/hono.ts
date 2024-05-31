/** Core */
import { hc } from 'hono/client';

/** Interfaces */
import { AppType } from '@/app/api/[[...route]]/route';

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
