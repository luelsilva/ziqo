declare module 'virtual:pwa-register/svelte' {
    import type { Writable } from 'svelte/store';

    export type RegisterSWOptions = {
        immediate?: boolean;
        onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
        onRegisterError?: (error: any) => void;
        onNeedRefresh?: () => void;
        onOfflineReady?: () => void;
    };

    export function useRegisterSW(options?: RegisterSWOptions): {
        needRefresh: Writable<boolean>;
        offlineReady: Writable<boolean>;
        updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
    };
}
