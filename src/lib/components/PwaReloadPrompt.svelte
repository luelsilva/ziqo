<script lang="ts">
  import { useRegisterSW } from 'virtual:pwa-register/svelte';

  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    }
  });

  function close() {
    offlineReady.set(false);
    needRefresh.set(false);
  }

  $: toast = $offlineReady || $needRefresh;
</script>

{#if toast}
  <div
    class="fixed right-0 bottom-0 m-4 p-4 border rounded bg-white shadow-lg z-50 flex flex-col gap-2 transition-all duration-300 transform"
    role="alert"
  >
    <div class="mb-2">
      {#if $offlineReady}
        <span class="text-amber-600 font-bold">App pronto para funcionar offline!</span>
      {:else}
        <span class="text-turquoise-600 font-bold">Nova versão disponível!</span>
      {/if}
    </div>
    <div class="flex gap-2">
      {#if $needRefresh}
        <button
          class="px-4 py-2 bg-turquoise-600 text-white rounded hover:bg-turquoise-700 transition-colors"
          on:click={() => updateServiceWorker(true)}
        >
          Atualizar
        </button>
      {/if}
      <button
        class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        on:click={close}
      >
        Fechar
      </button>
    </div>
  </div>
{/if}

<style>
  /* Custom colors if needed beyond Tailwind */
  .text-turquoise-600 {
    color: #14b8a6;
  }
  .bg-turquoise-600 {
    background-color: #14b8a6;
  }
  .hover\:bg-turquoise-700:hover {
    background-color: #0f766e;
  }
</style>
