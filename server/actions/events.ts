"use server"
import { db } from "@/drizzle/db";
import { EventTable } from "@/drizzle/schema";
import { eventFormSchema } from "@/schema/events";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

 // This file contains server actions related to events - required for Next.js

 // This function creates a new event, ensuring the user is authenticated and the data is valid
export async function createEvent(
    unsafeData: z.infer<typeof eventFormSchema> // The data type is inferred and validated from the Zod schema
): Promise<void> {
    try {
        const { userId } = await auth() // Authenticates the user and retrieves their ID
        const {success, data} = eventFormSchema.safeParse(unsafeData); // Validates the data against the eventFormSchema
        if (!success || !userId) {
            throw new Error("Invalid event data or user not authenticated");
        }

        // If validation is successful, proceed to insert the event into the DB, linking it to the userId
        await db.insert(EventTable).values({...data, clerkUserId: userId}) 
    } catch (err: any) 
    {
        // If any error occurs, throws a new error with a message
        throw new Error(`Failed to create event: ${err.message || err}`);
    } finally {
        revalidatePath("/events") // Revalidates the path to ensure the latest data is fetched drom the serve
}
}

// This function updates an existing event by its ID, ensuring the user is authenticated and has permission to update the event
export async function updateEvent(
    id: string, // The ID of the event to update
    unsafeData: z.infer<typeof eventFormSchema> // The data type is inferred and validated from the Zod schema
): Promise<void> {
    try {
        const { userId } = await auth() // Authenticates the user and retrieves their ID
        const {success, data} = eventFormSchema.safeParse(unsafeData); // Validates the data against the eventFormSchema
        if (!success || !userId) {
            throw new Error("Invalid event data or user not authenticated");
        }

        // If validation is successful, proceed to update the event in the DB, ensuring it belongs to the userId
        const { rowCount } = await db.update(EventTable).set({...data}).where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)))
        
        // Checks if the event exist 
        if (rowCount === 0) {
            throw new Error("Event not found or you do not have permission to update it");
        }
    
    } catch (err: any) {
        // If any error occurs, throws a new error with a message
        throw new Error(`Failed to update event: ${err.message || err}`);
    } finally {
        revalidatePath("/events") // Revalidates the path to ensure the latest data is fetched from the server
    }
}

// This function deletes an event by its ID, ensuring the user is authenticated and has permission to delete the event
export async function deleteEvent(
    id: string, // The ID of the event to update
): Promise<void> {
    try {
        const { userId } = await auth() // Authenticates the user and retrieves their ID
        if (!userId) {
            throw new Error("User not authenticated");
        }

        // If validation is successful, proceed to delete the event in the DB, ensuring it belongs to the userId
        const { rowCount } = await db.delete(EventTable).where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)))
        
        // Checks if the event exist 
        if (rowCount === 0) {
            throw new Error("Event not found or you do not have permission to delete it");
        }
    
    } catch (err: any) {
        // If any error occurs, throws a new error with a message
        throw new Error(`Failed to delete event: ${err.message || err}`);
    } finally {
        revalidatePath("/events") // Revalidates the path to ensure the latest data is fetched from the server
    }
}

type EventRow = typeof EventTable.$inferSelect;

// This function retrieves all events for the authenticated user
export async function getEvents(clerkUserId: string): Promise<EventRow[]> {
  // Query the database for events where the clerkUserId matches
  const events = await db.query.EventTable.findMany({
    // Filters events by the authenticated user's ID
    where: ({ clerkUserId: userIdCol }, { eq }) => eq(userIdCol, clerkUserId),
    // Events are ordered alphabetically (case-insensitive) by name
    orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
  })
    // Returns the full list of events
    return events
}