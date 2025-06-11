'use client';

import { useEffect, useState, useCallback } from 'react';
import { FoodDiary, OnAddDiaryItem } from './food-diary';
import { FoodTemplate, DiaryEntryCategory, DiaryEntry } from '@/db/generated/prisma';
import { createDiaryEntryForUser, getDiaryCategories, getDiaryEntriesForUser } from '@/lib/api/diary';
import {getFoodTemplatesForUser} from "@/lib/api/food";
export function FoodDiaryWrapper() {
    const [foodTemplates, setFoodTemplates] = useState<FoodTemplate[]>([]);
    const [diaryCategories, setDiaryCategories] = useState<DiaryEntryCategory[]>([]);
    const [diaryEntries, setDiaryEntries] = useState<{ [key: string]: DiaryEntry[] }>({});

    const fetchData = useCallback(async () => {
        const [templates, categories, entries] = await Promise.all([
            getFoodTemplatesForUser(),
            getDiaryCategories(),
            getDiaryEntriesForUser({ day: new Date() })
        ]);

        const categoryMap = new Map<string, string>();
        categories.forEach(c => categoryMap.set(c.id, c.key));

        const categorizedEntries = entries.reduce((acc, entry) => {
            const key = categoryMap.get(entry.categoryId) || 'uncategorized';
            if (!acc[key]) acc[key] = [];
            acc[key].push(entry);
            return acc;
        }, {} as { [key: string]: DiaryEntry[] });

        setFoodTemplates(templates);
        setDiaryCategories(categories);
        setDiaryEntries(categorizedEntries);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onAdd = async (item: OnAddDiaryItem) => {
        await createDiaryEntryForUser({
            date: new Date(),
            servings: item.servings,
            servingSize: item.servingSize,
            foodTemplateId: item.foodTemplateId,
            categoryId: item.categoryId,
        });

        await fetchData();
    };

    return (
        <FoodDiary
            foodTemplates={foodTemplates}
            diaryCategories={diaryCategories}
            diaryEntries={diaryEntries}
            onAdd={onAdd}
        />
    );
}
