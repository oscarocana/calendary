import { pgTable, boolean, index, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

// reusable code block that automatically sets the timestamp when the row is created (defualts to the current time)
const createdAt = timestamp("createdAt").notNull().defaultNow();

// reusable code block that automatically updates the timestamp when the row is updated (defaults to the current time)
const updatedAt = timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date());


//Defines the events table schema
export const EventTable = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    durationInMinutes: integer("duration_in_minutes").notNull(),
    clerkUserId: text("clerkUserId").notNull(),
    isActive: boolean("isActive").notNull().default(true),
    createdAt,
    updatedAt,

},
    (table) => ([
        index("clerkUserIdIndex").on(table.clerkUserId),
    ])
);
