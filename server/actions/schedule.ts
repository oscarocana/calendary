"use server"

import { db } from "@/drizzle/db"
import { ScheduleAvailabilityTable, ScheduleTable } from "@/drizzle/schema"

type ScheduleRow = typeof ScheduleTable.$inferSelect
type AvailabilityRow = typeof ScheduleAvailabilityTable.$inferSelect

export type FullSchedule = ScheduleRow & {
  availabilities: AvailabilityRow[]}

  export async function getSchedule(userId: string): Promise<FullSchedule> {
  // Queries the ScheduleTable for the first record that matches the user's ID
  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId), // Matches a schedule where user ID equals the provided userId
    with: {
      availability: true, // Includes all related availability records
    },
  })

  // Return the schedule if found, or null if it doesn't exist
  return schedule as FullSchedule | null
}

    
   
    

