"use client";
import { FoodDiary, OnAddDiaryItem } from "./food-diary";
import { FoodTemplate, DiaryEntryCategory, DiaryEntry } from "@/db/generated/prisma";
import { createDiaryEntryForUser } from "@/lib/api/diary";

interface FoodDiaryWrapperProps {
    foodTemplates: FoodTemplate[],
    diaryCategories: DiaryEntryCategory[],
    diaryEntries: {[key: string]: DiaryEntry[]}
}

export function FoodDiaryWrapper(props: FoodDiaryWrapperProps) {
    return <FoodDiary foodTemplates={props.foodTemplates} diaryCategories={props.diaryCategories} diaryEntries={props.diaryEntries} onAdd={onAdd} />
}

async function onAdd(item: OnAddDiaryItem) {
    return await createDiaryEntryForUser({
        date: new Date(),
        servings: item.servings,
        servingSize: item.servingSize,
        foodTemplateId: item.foodTemplateId,
        categoryId: item.categoryId,
    });
}