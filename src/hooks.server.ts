import { validateSession } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get("session");

    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const result = await validateSession(sessionId);

    if (result) {
        event.locals.user = result.user;
        event.locals.session = result.session;
    } else {
        event.cookies.delete("session", { path: "/" });
        event.locals.user = null;
        event.locals.session = null;
    }

    return resolve(event);
};
