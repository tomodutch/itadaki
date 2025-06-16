"use server"
import { createDiaryEntry, getDiaryEntries, getDiaryCategories as getDiaryCategoriesFromDb, getDiaryCategoriesAndEntries as getDiaryCategoriesAndEntriesFromDb } from "@/db/queries/diary";
import { ensureUserId } from "@/lib/auth";

interface GetDiaryEntryForUserArgs {
    day: Date
}

export async function getDiaryEntriesForUser(args: GetDiaryEntryForUserArgs) {
    const userId = await ensureUserId();
    return await getDiaryEntries({
        userId: userId,
        day: args.day
    });
}

interface CreateDiaryEntryForUserArgs {
    date: Date,
    categoryId: string,
    foodTemplateId: string,
};

export async function createDiaryEntryForUser(args: CreateDiaryEntryForUserArgs) {
    const userId = await ensureUserId();
    return await createDiaryEntry({
        date: args.date,
        userId: userId,
        categoryId: args.categoryId,
        foodTemplateId: args.foodTemplateId
    });
}

export async function getDiaryCategories() {
    return await getDiaryCategoriesFromDb();
}

export async function getDiaryCategoriesAndEntries(date: Date) {
    const userId = await ensureUserId();
    return await getDiaryCategoriesAndEntriesFromDb({ userId, date });
}