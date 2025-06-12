import { z } from "zod";
import { Prisma } from "@/db/generated/prisma";
import client from "@/lib/prisma";
import logger from "@/lib/logger";

// Nutritional fields shared between schemas
const nutritionFields = {
  calories: z.number().nonnegative("Calories cannot be negative"),

  protein: z.number().nonnegative().nullable().optional(),
  carbs: z.number().nonnegative().nullable().optional(),
  sugar: z.number().nonnegative().nullable().optional(),
  fiber: z.number().nonnegative().nullable().optional(),
  fat: z.number().nonnegative().nullable().optional(),
  saturatedFat: z.number().nonnegative().nullable().optional(),
  transFat: z.number().nonnegative().nullable().optional(),
  cholesterol: z.number().nonnegative().nullable().optional(),
  sodium: z.number().nonnegative().nullable().optional(),
  potassium: z.number().nonnegative().nullable().optional(),

  vitaminA: z.number().nonnegative().nullable().optional(),
  vitaminC: z.number().nonnegative().nullable().optional(),
  vitaminD: z.number().nonnegative().nullable().optional(),
  vitaminE: z.number().nonnegative().nullable().optional(),
  vitaminK: z.number().nonnegative().nullable().optional(),

  vitaminB1: z.number().nonnegative().nullable().optional(),
  vitaminB2: z.number().nonnegative().nullable().optional(),
  vitaminB3: z.number().nonnegative().nullable().optional(),
  vitaminB5: z.number().nonnegative().nullable().optional(),
  vitaminB6: z.number().nonnegative().nullable().optional(),
  vitaminB7: z.number().nonnegative().nullable().optional(),
  vitaminB9: z.number().nonnegative().nullable().optional(),
  vitaminB12: z.number().nonnegative().nullable().optional(),

  calcium: z.number().nonnegative().nullable().optional(),
  iron: z.number().nonnegative().nullable().optional(),
  magnesium: z.number().nonnegative().nullable().optional(),
  phosphorus: z.number().nonnegative().nullable().optional(),
  zinc: z.number().nonnegative().nullable().optional(),
  copper: z.number().nonnegative().nullable().optional(),
  manganese: z.number().nonnegative().nullable().optional(),
  selenium: z.number().nonnegative().nullable().optional(),

  alcohol: z.number().nonnegative().nullable().optional(),
  caffeine: z.number().nonnegative().nullable().optional(),
};

// Regular food template schema
export const createFoodTemplateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    brand: z.string().min(1).nullable().optional(),
    servingSize: z.number().positive("Serving size must be positive"),
    servingUnit: z.string().min(1, "Serving unit is required"),
    barCode: z.string().nullable().optional().transform(val => val === "" ? undefined : val),
    userId: z.string().cuid("Invalid userId format"),
    ...nutritionFields,
});

export async function createFoodTemplate(unsafeArgs: z.infer<typeof createFoodTemplateSchema> ) {
    const parsedArgs = createFoodTemplateSchema.safeParse(unsafeArgs);

    if (!parsedArgs.success) {
        logger.info("food template creation failed due to invalid schema", { errors: parsedArgs.error });
        throw new Error("Validation failed: " + parsedArgs.error.errors.map(e => e.message).join(", "));
    }

    const data: Prisma.FoodTemplateCreateInput = {
        name: parsedArgs.data.name,
        brand: parsedArgs.data.brand,
        servingSize: parsedArgs.data.servingSize,
        servingUnit: parsedArgs.data.servingUnit,
        barCode: parsedArgs.data.barCode,
        calories: parsedArgs.data.calories,
        protein: parsedArgs.data.protein,
        carbs: parsedArgs.data.carbs,
        sugar: parsedArgs.data.sugar,
        fiber: parsedArgs.data.fiber,
        fat: parsedArgs.data.fat,
        saturatedFat: parsedArgs.data.saturatedFat,
        transFat: parsedArgs.data.transFat,
        cholesterol: parsedArgs.data.cholesterol,
        sodium: parsedArgs.data.sodium,
        potassium: parsedArgs.data.potassium,
        vitaminA: parsedArgs.data.vitaminA,
        vitaminC: parsedArgs.data.vitaminC,
        vitaminD: parsedArgs.data.vitaminD,
        vitaminE: parsedArgs.data.vitaminE,
        vitaminK: parsedArgs.data.vitaminK,
        vitaminB1: parsedArgs.data.vitaminB1,
        vitaminB2: parsedArgs.data.vitaminB2,
        vitaminB3: parsedArgs.data.vitaminB3,
        vitaminB5: parsedArgs.data.vitaminB5,
        vitaminB6: parsedArgs.data.vitaminB6,
        vitaminB7: parsedArgs.data.vitaminB7,
        vitaminB9: parsedArgs.data.vitaminB9,
        vitaminB12: parsedArgs.data.vitaminB12,
        calcium: parsedArgs.data.calcium,
        iron: parsedArgs.data.iron,
        magnesium: parsedArgs.data.magnesium,
        phosphorus: parsedArgs.data.phosphorus,
        zinc: parsedArgs.data.zinc,
        copper: parsedArgs.data.copper,
        manganese: parsedArgs.data.manganese,
        selenium: parsedArgs.data.selenium,
        alcohol: parsedArgs.data.alcohol,
        caffeine: parsedArgs.data.caffeine,
        user: {
            connect: { id: parsedArgs.data.userId }
        },
        origin: "user",
    };

    try {
        return await client.foodTemplate.create({ data });
    } catch (e) {
        logger.error("Failed to create food template", { exception: e });
        throw e;
    }
}

// USDA-specific schema and logic
export const usdaFoodTemplateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    servingSize: z.number().positive("Serving size must be positive"),
    servingUnit: z.string().min(1, "Serving unit is required"),
    origin: z.literal("usda"),
    originId: z.string(),
    ...nutritionFields,
});

export type USDAFoodTemplateInput = z.infer<typeof usdaFoodTemplateSchema>;

export async function createUSDAFoodTemplate(raw: unknown, userId: string) {
    const parsed = usdaFoodTemplateSchema.safeParse(raw);

    if (!parsed.success) {
        logger.info("USDA food template creation failed due to invalid schema", { errors: parsed.error });
        throw new Error("Validation failed: " + parsed.error.errors.map(e => e.message).join(", "));
    }

    const data: Prisma.FoodTemplateCreateInput = {
        ...parsed.data,
        user: {
            connect: {
                id: userId
            }
        }
    };

    try {
        const existingFoodTemplate = await client.foodTemplate.findFirst({
            where: {
                originId: data.originId,
                userId: userId,
                deletedAt: null
            }
        });

        if (existingFoodTemplate) {
            return existingFoodTemplate;
        }

        return await client.foodTemplate.create({ data });
    } catch (e) {
        logger.error("Failed to create USDA food template", { exception: e });
        throw e;
    }
}

// Get user-owned food templates
interface GetFoodTemplateArgs {
    userId: string;
}

export async function getFoodTemplates(args: GetFoodTemplateArgs) {
    try {
        logger.info("get food templates", { args });
        return await client.foodTemplate.findMany({ where: { userId: args.userId } });
    } catch (e) {
        logger.error("Failed to get food templates", { exception: e });
        throw e;
    }
}
