"use client";

import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { format, addDays, subDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const goToPreviousDay = () => setDate((d) => (d ? subDays(d, 1) : new Date()))
    const goToNextDay = () => setDate((d) => (d ? addDays(d, 1) : new Date()))
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
                                    <BreadcrumbLink href="#">
                                        Statistics
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border py-3">
                            <div className="flex items-center justify-center gap-2 px-4">
                                <Button variant="ghost" size="icon" onClick={goToPreviousDay}>
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="flex items-center gap-2 px-4 py-2 text-base font-medium">
                                            <CalendarIcon className="w-4 h-4" />
                                            {format(date || new Date(), "EEE, MMM d, yyyy")}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                </Popover>

                                <Button variant="ghost" size="icon" onClick={goToNextDay}>
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
    )
}