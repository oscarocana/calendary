import { DAYS_OF_WEEK } from "@/constants";
import { timeToFloat } from "@/lib/utils";
import { z } from "zod";

export const scheduleFormSchema = z.object({
    timezone: z.string().min(1, "Timezone is required"),
    availabilities: z.array(
        z.object({
        startTime: z.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
        endTime: z.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
        dayOfWeek: (z.enum(DAYS_OF_WEEK)),
        })
    )
})
    // Code to ensure that startTime is before endTime and there are no overlapping availabilities
    .superRefine((data, ctx) => {
        data.availabilities.forEach((availability, index) => {
            const overlaps = data.availabilities.some((a, i) => {
                return (
                    i !== index && a.dayOfWeek === availability.dayOfWeek &&
                    timeToFloat(a.startTime) < timeToFloat(availability.endTime) &&
                    timeToFloat(a.endTime) > timeToFloat(availability.startTime)
                )
            })
            if (overlaps) {
                ctx.addIssue({
                    code: "custom",
                    message: "Availabilities cannot overlap one another",
                    path: ["availabilities", index, "startTime"]
                })
            }
            
            if (timeToFloat(availability.startTime) >= timeToFloat(availability.endTime)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Start time must be before end time",
                    path: ["availabilities", index, "endTime"]
                })
            }
        })
    })