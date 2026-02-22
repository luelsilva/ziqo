import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

const dbUrl = env.DATABASE_URL;
if (!dbUrl) throw new Error('DATABASE_URL is not defined in .env');

const client = postgres(dbUrl);
export const db = drizzle(client, { schema });
