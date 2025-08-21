"use client"

import { DAYS_OF_WEEK } from "@/constants";
import { timeToFloat } from "@/lib/utils";
import { scheduleFormSchema } from "@/schema/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { formatTimezoneOffset } from "@/lib/formatters";

type Availability = {
    startTime: string
    endTime: string
    dayOfWeek: (typeof DAYS_OF_WEEK )[number];
    };

export function ScheduleForm({
    schedule,
}:  {
    schedule?: {
        timezone: string;
        availabilities: Availability[];
    };
})
 {
    //initializing the form with Zod using the ScheduleFormSchema
    const form = useForm<z.infer<typeof scheduleFormSchema>>({
        resolver: zodResolver(scheduleFormSchema),
        defaultValues: {
            timezone: schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
            availabilities: schedule?.availabilities.toSorted((a, b) => {
                return timeToFloat(a.startTime) - timeToFloat(b.startTime);
            }),
            },    
    });

    return (
        <form {...form}>

            <form
            className="flex gap-4 flex-col"
            onSubmit={form.handleSubmit(onSubmit)}>

                {/* Shows form-level error if any */}
                {form.formState.errors.root && (
                <div className="text-destructive text-sm">
                    {form.formState.errors.root.message}
                </div>
                )}

            {/* section of the form for chosing the timezone */}
            <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {Intl.supportedValuesOf("timeZone").map(timezone => (
                                    <SelectItem key={timezone} value={timezone}>
                                    {timezone}
                                    {` (${formatTimezoneOffset(timezone)})`}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
            </form>

        </form>
)}