import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession } from "$lib/server/auth";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        if (!email || !password) {
            return fail(400, { message: "E-mail e senha são obrigatórios." });
        }

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (!user) {
            return fail(400, { message: "Usuário não encontrado." });
        }

        const valid = verifyPassword(password, user.passwordHash);

        if (!valid) {
            return fail(400, { message: "Senha incorreta." });
        }

        const sessionId = await createSession(user.id);

        cookies.set("session", sessionId, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30, // 30 dias
        });

        throw redirect(303, "/");
    }
};
