<script lang="ts">
    import { Smartphone, Zap, Shield, Repeat, LogOut, User } from "lucide-svelte";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    let visible = false;
    onMount(() => {
        visible = true;
    });
</script>

<div class="min-h-screen bg-white overflow-hidden">
    <!-- Hero Section -->
    <header class="relative pt-16 pb-24 px-6 sm:pt-24 sm:pb-32 lg:px-8">
        <div
            class="absolute inset-0 bg-gradient-to-br from-ziqo-amber/10 to-ziqo-turquoise/5 -z-10"
        ></div>

        <div class="max-w-7xl mx-auto text-center">
            <div
                class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-ziqo-amber/10 text-ziqo-amber text-sm font-medium mb-8 transition-all duration-1000 transform {visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'}"
            >
                <Zap size={14} class="fill-current" />
                <span>PWA Experience Redefined</span>
            </div>

            <h1
                class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 transition-all duration-1000 delay-100 transform {visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'}"
            >
                {#if data.user}
                    Olá, <span class="text-transparent bg-clip-text bg-gradient-to-r from-ziqo-amber to-ziqo-turquoise">{data.user.name.split(' ')[0]}</span>!
                {:else}
                    Bem-vindo ao <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-ziqo-amber to-ziqo-turquoise"
                        >ziqo</span
                    >
                {/if}
            </h1>

            <p
                class="max-w-2xl mx-auto text-lg text-slate-600 mb-10 transition-all duration-1000 delay-200 transform {visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'}"
            >
                {#if data.user}
                    Você está em sua área premium. Explore as ferramentas progressivas que preparamos para você.
                {:else}
                    Uma plataforma progressiva, rápida e focada em performance.
                    Instale agora e experimente a fluidez de um app nativo no seu
                    navegador.
                {/if}
            </p>

            <div
                class="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 transform {visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'}"
            >
                {#if data.user}
                    <div class="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                        <div class="w-10 h-10 bg-ziqo-turquoise/10 text-ziqo-turquoise rounded-full flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <div class="text-left">
                            <p class="text-sm font-bold text-slate-900">{data.user.name}</p>
                            <p class="text-xs text-slate-500">{data.user.email}</p>
                        </div>
                    </div>
                    <form action="/auth/logout" method="POST">
                        <button
                            type="submit"
                            class="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
                        >
                            <LogOut size={20} />
                            Sair da Conta
                        </button>
                    </form>
                {:else}
                    <a
                        href="/auth/signup"
                        class="w-full sm:w-auto px-8 py-4 bg-ziqo-amber text-white text-center font-bold rounded-2xl shadow-lg shadow-ziqo-amber/30 hover:bg-ziqo-amber/90 transition-all hover:scale-105 active:scale-95"
                    >
                        Começar Agora
                    </a>
                    <a
                        href="/auth/login"
                        class="w-full sm:w-auto px-8 py-4 bg-white text-ziqo-turquoise text-center font-bold rounded-2xl border-2 border-ziqo-turquoise/20 hover:border-ziqo-turquoise/50 transition-all hover:scale-105 active:scale-95"
                    >
                        Entrar no App
                    </a>
                {/if}
            </div>
        </div>
    </header>

    <!-- Features Grid -->
    <section class="max-w-7xl mx-auto px-6 py-24">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div
                class="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-ziqo-turquoise/30 transition-all group"
            >
                <div
                    class="w-12 h-12 bg-ziqo-turquoise/10 text-ziqo-turquoise rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                    <Smartphone size={24} />
                </div>
                <h3 class="text-xl font-bold mb-4 text-slate-800">
                    Instalável
                </h3>
                <p class="text-slate-600">
                    Adicione à tela inicial e acesse com apenas um toque, como
                    um aplicativo nativo.
                </p>
            </div>

            <!-- Feature 2 -->
            <div
                class="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-ziqo-amber/30 transition-all group"
            >
                <div
                    class="w-12 h-12 bg-ziqo-amber/10 text-ziqo-amber rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                    <Repeat size={24} />
                </div>
                <h3 class="text-xl font-bold mb-4 text-slate-800">
                    Modo Offline
                </h3>
                <p class="text-slate-600">
                    Continue navegando mesmo sem conexão com a internet. O ziqo
                    está sempre com você.
                </p>
            </div>

            <!-- Feature 3 -->
            <div
                class="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-ziqo-turquoise/30 transition-all group"
            >
                <div
                    class="w-12 h-12 bg-ziqo-turquoise/10 text-ziqo-turquoise rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                    <Shield size={24} />
                </div>
                <h3 class="text-xl font-bold mb-4 text-slate-800">
                    Segurança Total
                </h3>
                <p class="text-slate-600">
                    Criptografia de ponta a ponta e as melhores práticas de
                    segurança da web moderna.
                </p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="px-6 py-24">
        <div
            class="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-r from-ziqo-amber to-ziqo-turquoise p-1 gap-2"
        >
            <div class="bg-white rounded-[2.9rem] px-8 py-16 text-center">
                <h2 class="text-3xl font-bold text-slate-900 mb-6">
                    Pronto para transformar sua web?
                </h2>
                <p class="text-slate-600 mb-10 max-w-xl mx-auto">
                    Junte-se a milhares de usuários que já estão aproveitando o
                    futuro das aplicações progressivas.
                </p>
                <a
                    href="/auth/signup"
                    class="inline-block px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
                >
                    Criar conta gratuita
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 border-t border-slate-100 text-center">
        <p class="text-slate-400 text-sm">
            © 2026 ziqo. Todos os direitos reservados.
        </p>
    </footer>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
