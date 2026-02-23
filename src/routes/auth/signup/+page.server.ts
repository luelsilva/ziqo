import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, createVerificationEmail } from "$lib/server/auth";
import { Resend } from "resend";
import { env } from "$env/dynamic/private";
import type { Actions } from "./$types";

const resend = new Resend(env.RESEND_API_KEY);

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get("name") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        if (!name || !email || !password) {
            return fail(400, { message: "Todos os campos são obrigatórios." });
        }

        if (password.length < 8) {
            return fail(400, { message: "A senha deve ter pelo menos 8 caracteres." });
        }

        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser) {
            return fail(400, { message: "Este e-mail já está em uso." });
        }

        const passwordHash = hashPassword(password);

        try {
            const [newUser] = await db.insert(users).values({
                name,
                email,
                passwordHash,
                emailVerified: false,
            }).returning();

            const token = await createVerificationEmail(newUser.id, email);
            const verificationUrl = `${env.APP_URL || 'http://localhost:5173'}/auth/verify?token=${token}`;

            // Enviar e-mail via Resend
            await resend.emails.send({
                from: env.RESEND_FROM || "onboarding@resend.dev",
                to: email,
                subject: "Verifique seu e-mail | Ziqo 🚀",
                html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #f59e0b;">Ziqo</h1>
                    <p>Olá, <strong>${name}</strong>!</p>
                    <p>Bem-vindo ao Ziqo. Clique no botão abaixo para verificar sua conta:</p>
                    <a href="${verificationUrl}" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Verificar E-mail</a>
                </div>
                `
            });

            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(500, { message: "Erro ao criar conta. Tente novamente mais tarde." });
        }
    }
};
