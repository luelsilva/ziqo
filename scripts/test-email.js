import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

// Carrega as variáveis do .env
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';

// Pega o email de destino do argumento do comando ou usa um padrão
const toEmail = process.argv[2];

async function testEmail() {
    console.log('--- TESTE DE ENVIO DE EMAIL (RESEND) ---');

    if (!process.env.RESEND_API_KEY) {
        console.error('❌ ERRO: RESEND_API_KEY não encontrada no .env');
        return;
    }

    if (!toEmail) {
        console.error('❌ ERRO: Informe um email de destino.');
        console.log('Uso: node scripts/test-email.js seu-email@exemplo.com');
        return;
    }

    console.log(`📤 Enviando de: ${fromEmail}`);
    console.log(`📥 Enviando para: ${toEmail}`);
    console.log('⏳ Processando...');

    try {
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: toEmail,
            subject: 'Teste de Configuração - Ziqo App 🚀',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #f59e0b;">Ziqo Teste de Email</h2>
                    <p>Olá!</p>
                    <p>Se você recebeu este email, as configurações do <strong>Resend</strong> no seu app estão funcionando corretamente.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666;">Enviado de: ${fromEmail}</p>
                </div>
            `
        });

        if (error) {
            console.error('❌ ERRO NO RESEND:', error.message);
            if (error.message.includes('not verified')) {
                console.log('\n💡 DICA: Verifique se o domínio no RESEND_FROM está verificado no painel do Resend.');
            }
        } else {
            console.log('✅ SUCESSO! Email enviado com ID:', data.id);
            console.log('\nVerifique sua caixa de entrada (e a pasta de SPAM).');
        }
    } catch (err) {
        console.error('❌ ERRO INESPERADO:', err);
    }
}

testEmail();
