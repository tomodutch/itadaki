"use server"
import { createDiaryEntry, getDiaryEntries, getDiaryCategories as getDiaryCategoriesFromDb } from "@/db/queries/diary";
import { ensureUserId } from "@/lib/auth";

interface GetDiaryEntryForUserArgs {
    userId: string,
    day: Date
}

export async function getDiaryEntriesForUser(args: GetDiaryEntryForUserArgs) {
    return await getDiaryEntries({
        userId: args.userId,
        day: args.day
    });
}

interface CreateDiaryEntryForUserArgs {
    date: Date,
    servingSize: number,
    servings: number,
    categoryId: string,
    foodTemplateId: string,
};

export async function createDiaryEntryForUser(args: CreateDiaryEntryForUserArgs) {
    const userId = await ensureUserId();
    return await createDiaryEntry({
        date: args.date,
        userId: userId,
        servingSize: args.servingSize,
        servings: args.servings,
        categoryId: args.categoryId,
        foodTemplateId: args.foodTemplateId
    });
}

export async function getDiaryCategories() {
    return await getDiaryCategoriesFromDb();
}
