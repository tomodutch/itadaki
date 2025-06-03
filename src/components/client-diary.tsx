"use client";

import { FoodDiary } from "./dashboard/food-diary";

export default function ClientDiary() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Diary</h1>
            <p className="text-muted-foreground">Your personal diary entries will be displayed here.</p>
            <FoodDiary />
        </div>
    )
}