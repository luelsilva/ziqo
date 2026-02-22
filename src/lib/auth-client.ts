import { createAuthClient } from "better-auth/svelte";

const getBaseURL = () => {
    if (typeof window !== "undefined") return window.location.origin;
    return "http://localhost:5173";
};

export const authClient = createAuthClient({
    baseURL: getBaseURL()
});

export const { signIn, signUp, signOut, useSession } = authClient;
