"use client";
import { FoodTemplate } from "@/db/generated/prisma";
import { CategoryWithEntries } from "@/db/types";
import { useUrlDate } from "./dashboard/use-url-date";
import { DatePicker } from "./dashboard/date-picker";
import { useState } from "react";
import { createDiaryEntryForUser, getDiaryCategoriesAndEntries } from "@/lib/api/diary";
import { FoodDiary, OnAddDiaryItem } from "./dashboard/food-diary";

interface ClientDashboardProps {
    foodTemplates: FoodTemplate[],
    diaryEntries: CategoryWithEntries[]
}

export default function ClientDashboard({ foodTemplates, diaryEntries: initialEntries }: ClientDashboardProps) {
    const [date, setDate] = useUrlDate();
    const [entries, setEntries] = useState(initialEntries);
    const [isDiaryLoading, setIsDiaryLoading] = useState(false);

    const fetchEntriesForDate = async (newDate: Date) => {
        const updated = await getDiaryCategoriesAndEntries(newDate);
        setEntries(updated);
    };

    const handleDateChange = async (newDate: Date) => {
        setDate(newDate);
        try {
            setIsDiaryLoading(true);
            await fetchEntriesForDate(newDate);
        } finally {
            setIsDiaryLoading(false);
        }
    };

    const onAdd = async (item: OnAddDiaryItem) => {
        try {
            setIsDiaryLoading(true);

            await createDiaryEntryForUser({
                date,
                servings: item.servings,
                servingSize: item.servingSize,
                foodTemplateId: item.foodTemplateId,
                categoryId: item.categoryId,
            });

            await fetchEntriesForDate(date);
        } finally {
            setIsDiaryLoading(false);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Diary</h1>
            <p className="text-muted-foreground">Your personal diary entries will be displayed here.</p>
            <DatePicker date={date} onChange={handleDateChange} />
            <FoodDiary
                isLoading={isDiaryLoading}
                foodTemplates={foodTemplates}
                categorizedDiaryEntries={entries}
                onAdd={onAdd}
            />
        </div>
    );
}
