import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

import { building } from '$app/environment';

const dbUrl = env.DATABASE_URL;
if (!building && !dbUrl) throw new Error('DATABASE_URL is not defined in .env');

const client = building ? postgres('postgres://dummy') : postgres(dbUrl!);
export const db = drizzle(client, { schema });
