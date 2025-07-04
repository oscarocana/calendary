import { uuid } from "drizzle-orm/gel-core";
import { pgTable } from "drizzle-orm/pg-core";

//Defines the events table schema
export const EventTable = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    durationInMinutes: integer("duration_in_minutes").notNull(),
    clerkUserId: text("clerkUserId").notNull(),
    isActive: boolean("isActive").notNull.default(true),
},)