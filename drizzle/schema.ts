import { DAYS_OF_WEEK } from "@/constants";
import { One, relations } from "drizzle-orm";
import { unique } from "drizzle-orm/gel-core";
import { pgTable, boolean, index, text, timestamp, uuid, integer, pgEnum } from "drizzle-orm/pg-core";

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

// Defines the Schedules table schema, which is used to store the schedules for each user
export const ScheduleTable = pgTable("schedules", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserId: text("clerkUserId").notNull().unique(),
    timezone: text("timezone").notNull(),
    createdAt,
    updatedAt, 
})

// Defines the relationship between the ScheduleTable and the ScheduleAvailabilityTable
// This relationship allows us to query the availability for each schedule
export const scheduleRelationship = relations(ScheduleTable, ({ many }) => ({
    availability: many(ScheduleAvailabilityTable),
}));

// Defines the scheduleDayOfWeekEnum, which is used to represent the days of the week in the scheduleAvailability table
export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK)

// Defines the scheduleAvailability table schema, which is used to store the availability for each user
export const ScheduleAvailabilityTable = pgTable("scheduleAvailability", {
    id: uuid("id").primaryKey().defaultRandom(),
    scheduleId: uuid("scheduleId").notNull().references(() => ScheduleTable.id, {onDelete:"cascade"}),
    startTime: timestamp("startTime").notNull(),
    endTime: timestamp("endTime").notNull(),
    dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(),
    createdAt,
    updatedAt,
},
 table => ([
    index("scheduleIdIndex").on(table.scheduleId),
 ])
);

// Defines the relationship between the ScheduleAvailabilityTable and the ScheduleTable
// This relationship allows us to query the schedule for each availability
export const scheduleAvailabilityRelationship = relations(ScheduleAvailabilityTable, ({ one }) => ({
    schedule: one(ScheduleTable, {
        fields: [ScheduleAvailabilityTable.scheduleId],
        references: [ScheduleTable.id], // this is the foreign key relationship
    }),
}));