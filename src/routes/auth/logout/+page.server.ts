import { redirect } from "@sveltejs/kit";
import { invalidateSession } from "$lib/server/auth";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ cookies, locals }) => {
        const sessionId = cookies.get("session");
        if (sessionId) {
            await invalidateSession(sessionId);
            cookies.delete("session", { path: "/" });
        }
        locals.user = null;
        locals.session = null;

        throw redirect(303, "/auth/login");
    }
};
