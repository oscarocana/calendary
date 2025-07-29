"use server"

import { db } from "@/drizzle/db"
import { ScheduleAvailabilityTable, ScheduleTable } from "@/drizzle/schema"

type ScheduleRow = typeof ScheduleTable.$inferSelect
type AvailabilityRow = typeof ScheduleAvailabilityTable.$inferSelect

export type FullSchedule = ScheduleRow & {
  availabilities: AvailabilityRow[]}

  export async function getSchedule(userId: string): Promise<FullSchedule> {
  // Query the ScheduleTable for the first record that matches the user's ID
  // Also eagerly load the related 'availabilities' data
  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId), // Match schedule where user ID equals the provided userId
    with: {
      availability: true, // Include all related availability records
    },
  })

  // Return the schedule if found, or null if it doesn't exist
  return schedule as FullSchedule
}

    
   
    

