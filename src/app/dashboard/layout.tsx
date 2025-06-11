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
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from 'next/navigation';
import { addDays, subDays, format } from 'date-fns';
import Link from "next/link";
import { useUrlDate } from "@/components/dashboard/use-url-date";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const date = useUrlDate();
    const router = useRouter();

    const goToDate = (newDate: Date) => {
        const iso = format(newDate, 'yyyy-MM-dd');
        router.push(`/dashboard/${iso}`);
    };

    const prevDay = format(subDays(date, 1), 'yyyy-MM-dd');
    const nextDay = format(addDays(date, 1), 'yyyy-MM-dd');

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
                            <Link href={prevDay}>
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2 px-4 py-2 text-base font-medium">
                                        <CalendarIcon className="w-4 h-4" />
                                        {format(date || new Date(), "EEE, MMM d, yyyy")}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={date} onSelect={(value) => {
                                        if (value) {
                                            goToDate(value);
                                        }
                                    }} initialFocus />
                                </PopoverContent>
                            </Popover>

                            <Link href={nextDay}>
                                <ChevronRight className="w-5 h-5" />
                            </Link>
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