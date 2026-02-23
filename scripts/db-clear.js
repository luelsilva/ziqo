import postgres from 'postgres';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

async function clearDatabase() {
    console.log('--- LIMPANDO TABELAS DO BANCO DE DADOS (SISTEMA NATIVO) ---');

    if (!dbUrl) {
        console.error('❌ ERRO: DATABASE_URL não encontrada no .env');
        return;
    }

    const sql = postgres(dbUrl);

    try {
        console.log('⏳ Limpando registros...');

        // Limpa as novas tabelas do sistema nativo
        await sql.unsafe('TRUNCATE TABLE "sessions", "verification_tokens", "users" CASCADE;');

        console.log('✅ SUCESSO! Todas as tabelas de autenticação foram limpas.');
    } catch (err) {
        console.error('❌ ERRO ao limpar banco:', err.message);
    } finally {
        await sql.end();
        process.exit();
    }
}

clearDatabase();
