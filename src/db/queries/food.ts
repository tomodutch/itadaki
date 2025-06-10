import client from "@/lib/prisma";
import { FoodTemplate, Prisma } from "@/db/generated/prisma";
import { z } from "zod";
import logger from "@/lib/logger";

interface createFoodTemplateArgs extends z.infer<typeof createFoodTemplateSchema> {
    name: string,
    brand?: string,
    servingSize: number,
    servingUnit: string,
    calories: number,
    userId: string,
}

export const createFoodTemplateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    brand: z.string().min(1).optional(),
    servingSize: z.number().positive("Serving size must be positive"),
    servingUnit: z.string().min(1, "Serving unit is required"),
    barCode: z.string().optional().transform((val) => (val === "" ? undefined : val)),
    calories: z.number().nonnegative("Calories cannot be negative"),

    protein: z.number().nonnegative().optional(),
    carbs: z.number().nonnegative().optional(),
    sugar: z.number().nonnegative().optional(),
    fiber: z.number().nonnegative().optional(),
    fat: z.number().nonnegative().optional(),
    saturatedFat: z.number().nonnegative().optional(),
    transFat: z.number().nonnegative().optional(),
    cholesterol: z.number().nonnegative().optional(),

    sodium: z.number().nonnegative().optional(),
    potassium: z.number().nonnegative().optional(),

    vitaminA: z.number().nonnegative().optional(),
    vitaminC: z.number().nonnegative().optional(),
    vitaminD: z.number().nonnegative().optional(),
    vitaminE: z.number().nonnegative().optional(),
    vitaminK: z.number().nonnegative().optional(),

    vitaminB1: z.number().nonnegative().optional(),
    vitaminB2: z.number().nonnegative().optional(),
    vitaminB3: z.number().nonnegative().optional(),
    vitaminB5: z.number().nonnegative().optional(),
    vitaminB6: z.number().nonnegative().optional(),
    vitaminB7: z.number().nonnegative().optional(),
    vitaminB9: z.number().nonnegative().optional(),
    vitaminB12: z.number().nonnegative().optional(),

    calcium: z.number().nonnegative().optional(),
    iron: z.number().nonnegative().optional(),
    magnesium: z.number().nonnegative().optional(),
    phosphorus: z.number().nonnegative().optional(),
    zinc: z.number().nonnegative().optional(),
    copper: z.number().nonnegative().optional(),
    manganese: z.number().nonnegative().optional(),
    selenium: z.number().nonnegative().optional(),

    alcohol: z.number().nonnegative().optional(),
    caffeine: z.number().nonnegative().optional(),

    userId: z.string().cuid("Invalid userId format"),
});

export async function createFoodTemplate(unsafeArgs: createFoodTemplateArgs) {
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

interface GetFoodTemplateArgs {
    userId: string
}

export async function getFoodTemplates(args: GetFoodTemplateArgs): Promise<FoodTemplate[]> {
    try {
        logger.info("get food templates", { args });
        return await client.foodTemplate.findMany({ where: { userId: args.userId } });
    } catch (e) {
        logger.error("Failed to get food templates", { exception: e });
        throw e;
    }
}
