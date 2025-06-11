"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    CalendarIcon,
} from "lucide-react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { addDays, subDays, format } from "date-fns";
import { useDebouncedCallback } from "use-debounce";
import { useUrlDate } from "@/components/dashboard/use-url-date";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const dateFromUrl = useUrlDate();
    const [selectedDate, setSelectedDate] = useState<Date>(dateFromUrl);
    const router = useRouter();

    // Keep local state in sync with URL changes
    useEffect(() => {
        setSelectedDate(dateFromUrl);
    }, [dateFromUrl]);

    const debouncedGoToDate = useDebouncedCallback((newDate: Date) => {
        const iso = format(newDate, "yyyy-MM-dd");
        router.push(`/dashboard/${iso}`);
    }, 500);

    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            setSelectedDate(newDate);
            debouncedGoToDate(newDate);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Statistics</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border py-3">
                        <div className="flex items-center justify-center gap-2 px-4">
                            <Button
                                variant="outline"
                                onClick={() => handleDateChange(subDays(selectedDate, 1))}
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
                                        {format(selectedDate, "EEE, MMM d, yyyy")}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={handleDateChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <Button
                                variant="outline"
                                onClick={() => handleDateChange(addDays(selectedDate, 1))}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
