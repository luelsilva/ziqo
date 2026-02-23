import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.RESEND_FROM || "onboarding@resend.dev";
const to = process.argv[2];

async function testEmail() {
    console.log('--- TESTE DE ENVIO DE EMAIL (RESEND) ---');

    if (!process.env.RESEND_API_KEY) {
        console.error('❌ ERRO: RESEND_API_KEY não encontrada no .env');
        return;
    }

    if (!to) {
        console.error('❌ ERRO: Informe um e-mail de destino. Ex: node scripts/test-email.js seu@email.com');
        return;
    }

    console.log(`📤 Enviando de: ${from}`);
    console.log(`📥 Enviando para: ${to}`);
    console.log('⏳ Processando...');

    try {
        const { data, error } = await resend.emails.send({
            from: from,
            to: to,
            subject: 'Teste de Envio | Ziqo 🚀',
            html: `
                <div style="font-family: sans-serif; padding: 20px; background: #f9fafb; border-radius: 10px;">
                    <h1 style="color: #f59e0b;">Ziqo working!</h1>
                    <p>Este é um e-mail de teste para confirmar que sua integração com o <strong>Resend</strong> está funcionando perfeitamente no novo sistema nativo.</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666;">Enviado em: ${new Date().toLocaleString()}</p>
                </div>
            `
        });

        if (error) {
            console.error('❌ ERRO no Resend:', error);
        } else {
            console.log('✅ SUCESSO! Email enviado com ID:', data.id);
            console.log('\nVerifique sua caixa de entrada (e a pasta de SPAM).');
        }
    } catch (err) {
        console.error('❌ ERRO inesperado:', err.message);
    }
}

testEmail();
