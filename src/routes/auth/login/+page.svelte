<script lang="ts">
    import { Zap, Eye, EyeOff } from "lucide-svelte";
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    let loading = false;
    let visible = false;
    let showPassword = false;

    // Check for success message from signup
    const registered = page.url.searchParams.get("registered");
    const verified = page.url.searchParams.get("verified");

    onMount(() => {
        visible = true;
    });
</script>

<div
    class="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50"
>
    <div
        class="absolute inset-0 bg-gradient-to-br from-ziqo-amber/5 to-ziqo-turquoise/5 -z-10"
    ></div>

    <div
        class="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-white transition-all duration-700 transform {visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'}"
    >
        <div class="flex flex-col items-center mb-8 text-center">
            <div
                class="w-16 h-16 bg-ziqo-turquoise/10 text-ziqo-turquoise rounded-2xl flex items-center justify-center mb-4"
            >
                <Zap size={32} class="fill-current" />
            </div>
            <h1 class="text-3xl font-extrabold text-slate-900">
                Bem-vindo de volta
            </h1>
            <p class="text-slate-500 mt-2">Acesse sua conta no ziqo</p>
        </div>

        {#if registered}
            <div
                class="mb-6 p-4 bg-ziqo-turquoise/10 text-ziqo-turquoise-dark rounded-2xl text-sm font-medium border border-ziqo-turquoise/20 italic"
            >
                Sua conta foi criada! Verifique seu e-mail para continuar.
            </div>
        {/if}

        {#if verified}
            <div
                class="mb-6 p-4 bg-ziqo-turquoise/10 text-ziqo-turquoise-dark rounded-2xl text-sm font-medium border border-ziqo-turquoise/20 italic"
            >
                E-mail verificado com sucesso! Você já pode entrar.
            </div>
        {/if}

        {#if form?.message}
            <div
                class="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100"
            >
                {form.message}
            </div>
        {/if}

        <form
            method="POST"
            use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                    loading = false;
                    await update();
                };
            }}
            class="space-y-5"
        >
            <div>
                <label
                    for="email"
                    class="block text-sm font-semibold text-slate-700 mb-2"
                    >E-mail</label
                >
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="seu@email.com"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ziqo-turquoise/20 focus:border-ziqo-turquoise transition-all text-slate-900 placeholder:text-slate-400"
                />
            </div>

            <div>
                <div class="flex justify-between mb-2">
                    <label
                        for="password"
                        class="block text-sm font-semibold text-slate-700"
                        >Senha</label
                    >
                    <a
                        href="/auth/forgot-password"
                        class="text-xs text-ziqo-amber font-semibold hover:underline"
                        >Esqueceu a senha?</a
                    >
                </div>
                <div class="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        required
                        placeholder="••••••••"
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ziqo-turquoise/20 focus:border-ziqo-turquoise transition-all text-slate-900 placeholder:text-slate-400 pr-12"
                    />
                    <button
                        type="button"
                        on:click={() => (showPassword = !showPassword)}
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                        {#if showPassword}
                            <EyeOff size={20} />
                        {:else}
                            <Eye size={20} />
                        {/if}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                class="w-full py-4 bg-ziqo-turquoise text-white font-bold rounded-2xl shadow-lg shadow-ziqo-turquoise/30 hover:bg-ziqo-turquoise-dark transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
            >
                {#if loading}
                    <span class="animate-pulse">Entrando...</span>
                {:else}
                    Entrar
                {/if}
            </button>
        </form>

        <div class="mt-8 pt-8 border-t border-slate-100 text-center">
            <p class="text-slate-500 text-sm">
                Ainda não tem conta?
                <a
                    href="/auth/signup"
                    class="text-ziqo-amber font-bold hover:underline transition-all"
                    >Criar nova conta</a
                >
            </p>
        </div>
    </div>
</div>
