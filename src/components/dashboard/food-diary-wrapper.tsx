'use client';

import { useEffect, useState, useCallback } from 'react';
import { FoodDiary, OnAddDiaryItem } from './food-diary';
import { FoodTemplate } from '@/db/generated/prisma';
import { createDiaryEntryForUser, getDiaryCategoriesAndEntries } from '@/lib/api/diary';
import { getFoodTemplatesForUser } from "@/lib/api/food";
import { CategoryWithEntries } from '@/db/types';
import { useUrlDate } from './use-url-date';
export function FoodDiaryWrapper() {
    const [foodTemplates, setFoodTemplates] = useState<FoodTemplate[]>([]);
    const [diaryEntries, setDiaryEntries] = useState<CategoryWithEntries[]>([]);
    const date = useUrlDate();

    const fetchData = useCallback(async () => {
        const [templates, entries] = await Promise.all([
            getFoodTemplatesForUser(),
            getDiaryCategoriesAndEntries(date)
        ]);

        setFoodTemplates(templates);
        setDiaryEntries(entries);
    }, [date]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onAdd = async (item: OnAddDiaryItem) => {
        await createDiaryEntryForUser({
            date,
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
            categorizedDiaryEntries={diaryEntries}
            onAdd={onAdd}
        />
    );
}
