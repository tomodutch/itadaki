'use client';

import { useEffect, useState, useCallback } from 'react';
import { FoodDiary, OnAddDiaryItem } from './food-diary';
import { FoodTemplate } from '@/db/generated/prisma';
import { createDiaryEntryForUser, getDiaryCategoriesAndEntries } from '@/lib/api/diary';
import { CategoryWithEntries } from '@/db/types';
import { useUrlDate } from './use-url-date';
interface FoodDiaryWrapperProps {
    foodTemplates: FoodTemplate[],
    diaryEntries: CategoryWithEntries[]
}

export function FoodDiaryWrapper(props: FoodDiaryWrapperProps) {
    const [diaryEntries, setDiaryEntries] = useState<CategoryWithEntries[]>(props.diaryEntries);
    const date = useUrlDate();
    const fetchData = useCallback(async () => {
        const entries = await getDiaryCategoriesAndEntries(date);
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
            foodTemplates={props.foodTemplates}
            categorizedDiaryEntries={diaryEntries}
            onAdd={onAdd}
        />
    );
}
