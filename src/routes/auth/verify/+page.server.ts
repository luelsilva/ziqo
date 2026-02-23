import { db } from "$lib/server/db";
import { users, verificationTokens } from "$lib/server/db/schema";
import { eq, and } from "drizzle-orm";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const token = url.searchParams.get("token");

    if (!token) {
        throw error(400, "Token de verificação ausente.");
    }

    const [verification] = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, token))
        .limit(1);

    if (!verification || Date.now() >= verification.expiresAt.getTime()) {
        throw error(400, "Token inválido ou expirado.");
    }

    await db.transaction(async (tx) => {
        await tx.update(users)
            .set({ emailVerified: true })
            .where(eq(users.id, verification.userId));

        await tx.delete(verificationTokens)
            .where(eq(verificationTokens.id, verification.id));
    });

    throw redirect(303, "/auth/login?verified=true");
};
