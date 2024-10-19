// /drizzle/schema.ts
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
});

export default waitlist;