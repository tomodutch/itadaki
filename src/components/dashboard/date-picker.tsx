"use client";

import { subDays, addDays, format } from "date-fns";
import { ChevronLeft, CalendarIcon, ChevronRight } from "lucide-react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";

interface DatePickerProps {
    onChange: (date: Date) => void,
    date: Date
}

export function DatePicker(props: DatePickerProps) {
    const [internalDate, setInternalDate] = useState<Date>(props.date);
    // Sync internal state when prop changes
    useEffect(() => {
        setInternalDate(props.date);
    }, [props.date]);

    const debouncedGoToDate = useDebouncedCallback((newDate: Date) => {
        props.onChange(newDate);
    }, 200);

    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            setInternalDate(newDate);
            debouncedGoToDate(newDate);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 px-4">
            <Button
                variant="outline"
                onClick={() => handleDateChange(subDays(props.date, 1))}
            >
                <ChevronLeft className="w-5 h-5" />
            </Button>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 px-4 py-2 text-base font-medium"
                    >
                        <CalendarIcon className="w-4 h-4" />
                        {format(internalDate, "EEE, MMM d, yyyy")}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={internalDate}
                        onSelect={handleDateChange}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <Button
                variant="outline"
                onClick={() => handleDateChange(addDays(internalDate, 1))}
            >
                <ChevronRight className="w-5 h-5" />
            </Button>
        </div>
    );
}