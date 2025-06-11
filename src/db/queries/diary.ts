import { DiaryEntry, Prisma } from "@/db/generated/prisma";
import client from "@/lib/prisma";
import logger from "@/lib/logger";
import { z } from "zod";
import { CategoryWithEntries } from "../types";

interface createDiaryEntryArgs extends z.infer<typeof createDiaryEntrySchema> {
    date: Date,
    servingSize: number,
    servings: number,
    categoryId: string,
    foodTemplateId: string,
    userId: string,
}

export const createDiaryEntrySchema = z.object({
    date: z.date(),
    servingSize: z.number().positive("Serving size must be positive"),
    servings: z.number().positive("Serving size must be positive"),
    categoryId: z.string(),
    foodTemplateId: z.string().cuid("Invalid foodTemplateId format"),
    userId: z.string().cuid("Invalid userId format"),
}).superRefine(async (data, context) => {
    const [category, foodTemplate] = await Promise.all([
        client.diaryEntryCategory.findUnique({
            where: { id: data.categoryId, deletedAt: null },
            select: { id: true },
        }),
        client.foodTemplate.findUnique({
            where: { id: data.foodTemplateId, deletedAt: null },
            select: { userId: true },
        }),
    ]);

    if (!category) {
        context.addIssue({
            path: ["category"],
            code: z.ZodIssueCode.custom,
            message: "Category does not exist",
        });
    }

    if (!foodTemplate) {
        context.addIssue({
            path: ["foodTemplateId"],
            code: z.ZodIssueCode.custom,
            message: "Food template does not exist",
        });
    } else if (foodTemplate.userId !== data.userId) {
        context.addIssue({
            path: ["foodTemplateId"],
            code: z.ZodIssueCode.custom,
            message: "Food template does not belong to this user",
        });
    }
});

export async function createDiaryEntry(unsafeArgs: createDiaryEntryArgs) {
    const parsedArgs = await createDiaryEntrySchema.safeParseAsync(unsafeArgs);

    if (!parsedArgs.success) {
        logger.info("Diary entry failed due to invalid schema", { errors: parsedArgs.error });
        throw new Error("Validation failed: " + parsedArgs.error.errors.map(e => e.message).join(", "));
    }

    const foodTemplate = await client.foodTemplate.findFirst({
        where: {
            id: parsedArgs.data.foodTemplateId,
            userId: parsedArgs.data.userId,
            deletedAt: null
        }
    });

    if (!foodTemplate) {
        const msg = "Creating diary entry failed because food template id does not exist";
        logger.info(msg, { unsafeArgs });
        throw new Error(msg);
    }

    const factor = parsedArgs.data.servings * parsedArgs.data.servingSize;

    const nutrientFields = [
        "protein",
        "carbs",
        "sugar",
        "fiber",
        "fat",
        "saturatedFat",
        "transFat",
        "cholesterol",
        "sodium",
        "potassium",
        "vitaminA",
        "vitaminC",
        "vitaminD",
        "vitaminE",
        "vitaminK",
        "vitaminB1",
        "vitaminB2",
        "vitaminB3",
        "vitaminB5",
        "vitaminB6",
        "vitaminB7",
        "vitaminB9",
        "vitaminB12",
        "calcium",
        "iron",
        "magnesium",
        "phosphorus",
        "zinc",
        "copper",
        "manganese",
        "selenium",
        "alcohol",
        "caffeine",
    ] as const;

    const scaledNutrition: Partial<Record<typeof nutrientFields[number], number>> = {};

    for (const key of nutrientFields) {
        const value = foodTemplate[key];
        if (typeof value === "number") {
            scaledNutrition[key] = value * factor;
        }
    }

    const data: Prisma.DiaryEntryCreateInput = {
        name: foodTemplate.name,
        servingSize: parsedArgs.data.servingSize,
        servingUnit: foodTemplate.servingUnit,
        servings: parsedArgs.data.servings,
        date: parsedArgs.data.date,
        category: {
            connect: { id: parsedArgs.data.categoryId }
        },
        foodTemplate: {
            connect: { id: parsedArgs.data.foodTemplateId }
        },
        user: {
            connect: { id: parsedArgs.data.userId }
        },
        calories: foodTemplate.calories * factor,
        ...scaledNutrition,
    };

    try {
        return await client.diaryEntry.create({ data });
    } catch (e) {
        logger.error("could not create diary entry", { error: e, unsafeArgs });
        throw e;
    }
}

interface GetDiaryEntriesArgs {
    userId: string,
    day: Date
}

export async function getDiaryEntries(args: GetDiaryEntriesArgs): Promise<DiaryEntry[]> {
    try {
        return await client.diaryEntry.findMany({
            where: {
                userId: args.userId,
                date: args.day,
                deletedAt: null
            },
            include: {
                category: true
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    } catch (e) {
        logger.error("Failed to get diary for user", { error: e, args })
        throw e;
    }
}

export async function getDiaryCategories() {
    return await client.diaryEntryCategory.findMany(
        { where: { deletedAt: null }, orderBy: { createdAt: "desc" } });
}

interface GetDiaryCategoriesAndEntriesArgs {
    userId: string,
    date?: Date
}

export async function getDiaryCategoriesAndEntries(args: GetDiaryCategoriesAndEntriesArgs): Promise<CategoryWithEntries[]> {
    return await client.diaryEntryCategory.findMany({
        where: {
            deletedAt: null
        },
        orderBy: {
            order: "asc"
        },
        include: {
            diaryEntries: {
                where: {
                    userId: args.userId,
                    deletedAt: null,
                    date: args.date
                }
            }
        }
    });
}