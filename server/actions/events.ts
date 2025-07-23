"use server"
import { db } from "@/drizzle/db";
import { EventTable } from "@/drizzle/schema";
import { eventFormSchema } from "@/schema/events";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

 // This file contains server actions related to events - required for Next.js

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
        db.insert(EventTable).values({...data, clerkUserId: userId}) 
    } catch (err: any) 
    {
        // If any error occurs, throws a new error with a message
        throw new Error(`Failed to create event: ${err.message || err}`);
    } finally {
        revalidatePath("/events") // Revalidates the path to ensure the latest data is fetched drom the server
        redirect("/events") // Redirects the user to the events page after event creation
    }
}