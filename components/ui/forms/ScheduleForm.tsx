"use client"

import { DAYS_OF_WEEK } from "@/constants";
import { timeToFloat } from "@/lib/utils";
import { scheduleFormSchema } from "@/schema/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { formatTimezoneOffset } from "@/lib/formatters";
import { Fragment } from "react";
import { Button } from "../button";
import { Plus, X } from "lucide-react";
import { Input } from "../input";

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


const {
    append: addAvailability, // Add a new availability entry
    remove: removeAvailability, // Remove availability entry
    fields: availabilityFields, // Current availability fields
  } = useFieldArray({ name: "availabilities", control: form.control })

        // Groups the available slot by each dayof the week for UI rendering
    const groupedAvailabilityFields = Object.groupBy(
        availabilityFields.map((field, index) => ({ ...field, index })),
        availability => availability.dayOfWeek
        )

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
            
                    {/* displays Availability on the form grouped by day */}
                    <div className="grid grid-cols-[auto_auto]  gap-y-6">
                {DAYS_OF_WEEK.map(dayOfWeek => (
                <Fragment key={dayOfWeek}>
                    {/* Day label */}
                    <div className="capitalize text-sm font-semibold">
                    {dayOfWeek.substring(0, 3)}
                    </div>

                    {/* Button to add availability for a specific day */}
                    <div className="flex flex-col gap-2">
                    <Button
                        type="button"
                        className="size-6 p-1 cursor-pointer hover:scale-200"
                        variant="outline"
                        onClick={() => {
                        addAvailability({
                            dayOfWeek,
                            startTime: "9:00",
                            endTime: "17:00",
                        })
                        }}
                    >
                        <Plus  color="green" />
                    </Button>

                    {/* Renders all availability entries for this day */}
                        {groupedAvailabilityFields[dayOfWeek]?.map(
                            (field, labelIndex) => (
                            <div className="flex flex-col gap-1" key={field.id}>
                                <div className="flex gap-2 items-center">
                                {/* input for the availability Start time*/}
                                <FormField
                                    control={form.control}
                                    name={`availabilities.${field.index}.startTime`}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input
                                            className="w-24"
                                            aria-label={`${dayOfWeek} Start Time ${
                                            labelIndex + 1
                                            }`}
                                            {...field}
                                        />
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />
                                -
                                {/* input for the availability End time */}
                                <FormField
                                    control={form.control}
                                    name={`availabilities.${field.index}.endTime`}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input
                                            className="w-24"
                                            aria-label={`${dayOfWeek} End Time ${
                                            labelIndex + 1
                                            }`}
                                            {...field}
                                        />
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />

                                {/* Removes the availability */}
                                <Button
                                    type="button"
                                    className="size-6 p-1 cursor-pointer hover:bg-red-900"
                                    variant="destructive"
                                    onClick={() => removeAvailability(field.index)}
                                >
                                    <X />
                                </Button>
                                </div>

                                {/* Shows validation messages */}
                                <FormMessage>
                                {
                                    form.formState.errors.availabilities?.at?.(
                                    field.index
                                    )?.root?.message
                                    
                                }
                                </FormMessage>
                                <FormMessage>
                                {
                                    form.formState.errors.availabilities?.at?.(
                                    field.index
                                    )?.startTime?.message
                                }
                                </FormMessage>
                                <FormMessage>
                                {
                                    form.formState.errors.availabilities?.at?.(
                                    field.index
                                    )?.endTime?.message
                                }
                                </FormMessage>
                            </div>
                            )
                                )}
                                </div>
                            </Fragment>
                            ))}
                    </div>      
                        {/* Submit button to save the schedule */}
                        <div className="flex gap-2 justify-start">
                        <Button 
                        className="cursor-pointer hover:scale-105 bg-blue-400 hover:bg-blue-600"
                        disabled={form.formState.isSubmitting}
                        type="submit">
                        Save
                        </Button>
                    </div>
            </form>
        </form>
)}