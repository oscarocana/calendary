"use client"

import { DAYS_OF_WEEK } from "@/constants";
import { timeToFloat } from "@/lib/utils";
import { scheduleFormSchema } from "@/schema/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type availability = {
    startTime: string;
    endTime: string;
    daysOfWeek: (typeof DAYS_OF_WEEK )[number];
    };

export function ScheduleForm({ schedule }) {
    schedule,
}:{
    schedule?: {
        timezone: string;
        availabilities: availabilities[];
    };
}) {
    //initializing the form with Zod using the ScheduleFormSchema
    const form = useForm<z.infer<typeof scheduleFormSchema>>({
        resolver: zodResolver(scheduleFormSchema),
        defaultValues: {
            timezone: schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
            availabilities: schedule?.availabilities.toSorted((a, b) => {
                return timeToFloat(a.startTime) - timeToFloat(b.startTime);
            }),
            },    
        },
    });

    return (
        <form {...form}>

            <form>



            </form>

        </form>
}