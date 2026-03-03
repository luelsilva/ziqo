import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
    id: text("id").primaryKey(), // Session Cookie ID
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: timestamp("expires_at").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
});
