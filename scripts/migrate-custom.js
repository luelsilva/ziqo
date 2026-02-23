import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

async function migrate() {
    if (!dbUrl) throw new Error('DATABASE_URL is missing');
    const sql = postgres(dbUrl);

    console.log('🚀 Iniciando migração customizada...');

    try {
        // Drop old Better Auth tables if they exist
        console.log('🗑️ Removendo tabelas antigas...');
        await sql.unsafe('DROP TABLE IF EXISTS "session" CASCADE;');
        await sql.unsafe('DROP TABLE IF EXISTS "account" CASCADE;');
        await sql.unsafe('DROP TABLE IF EXISTS "verification" CASCADE;');
        await sql.unsafe('DROP TABLE IF EXISTS "user" CASCADE;');

        // Tables will be created by drizzle-kit push
        console.log('✅ Tabelas antigas removidas.');
    } catch (err) {
        console.error('❌ Erro na migração:', err);
    } finally {
        await sql.end();
    }
}

migrate();
