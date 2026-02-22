import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env');

console.log('--- ZIQO PRODUCTION READINESS CHECK ---');

if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found!');
    process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const checks = {
    'Better Auth URL': /BETTER_AUTH_URL="https:\/\/ziqo\.lco\.com\.br"/.test(envContent),
    'Origin URL': /ORIGIN="https:\/\/ziqo\.lco\.com\.br"/.test(envContent),
    'Resend From Domain': /RESEND_FROM="ziqo <.*@mbook\.lco\.com\.br>"/.test(envContent),
    'Supabase URL': /SUPABASE_URL="https:\/\/.*\.supabase\.co"/.test(envContent),
    'HTTPS Protocol': envContent.includes('https://ziqo.lco.com.br')
};

let allPassed = true;

for (const [name, passed] of Object.entries(checks)) {
    if (passed) {
        console.log(`✅ ${name}: OK`);
    } else {
        console.error(`❌ ${name}: FAILED`);
        allPassed = false;
    }
}

console.log('\n--- VERIFICAÇÃO DE ADAPTADOR ---');
const svelteConfig = fs.readFileSync('svelte.config.js', 'utf8');
if (svelteConfig.includes('@sveltejs/adapter-auto')) {
    console.log('⚠️ SvelteKit está usando adapter-auto. Certifique-se de que seu provedor (Vercel/Netlify/docs) suporte isso.');
} else {
    console.log('✅ Adaptador configurado.');
}

if (allPassed) {
    console.log('\n🚀 O app está PRONTO para rodar em ziqo.lco.com.br!');
} else {
    console.log('\n⚠️ Algumas configurações de produção ainda precisam de atenção.');
}
