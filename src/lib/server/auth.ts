import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";
import { db } from "./db";
import { users, sessions, verificationTokens } from "./db/schema";
import { eq } from "drizzle-orm";
import { env } from "$env/dynamic/private";

// Configuração de Hash (Scrypt)
const SALT_SIZE = 16;
const KEY_LEN = 64;

export function hashPassword(password: string): string {
    const salt = randomBytes(SALT_SIZE).toString("hex");
    const derivedKey = scryptSync(password, salt, KEY_LEN);
    return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password: string, hash: string): boolean {
    const [salt, key] = hash.split(":");
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = scryptSync(password, salt, KEY_LEN);
    return timingSafeEqual(keyBuffer, derivedKey);
}

// Session Management
export async function createSession(userId: string): Promise<string> {
    const sessionId = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 dias

    await db.insert(sessions).values({
        id: sessionId,
        userId,
        expiresAt,
    });

    return sessionId;
}

export async function validateSession(sessionId: string) {
    const [session] = await db
        .select()
        .from(sessions)
        .where(eq(sessions.id, sessionId))
        .limit(1);

    if (!session || Date.now() >= session.expiresAt.getTime()) {
        if (session) await db.delete(sessions).where(eq(sessions.id, sessionId));
        return null;
    }

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, session.userId))
        .limit(1);

    return { session, user };
}

export async function invalidateSession(sessionId: string) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
}

// Verification Tokens
export async function createVerificationEmail(userId: string, email: string) {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 horas

    await db.insert(verificationTokens).values({
        userId,
        token,
        expiresAt,
    });

    return token;
}
