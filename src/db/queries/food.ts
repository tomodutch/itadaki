import client from "@/lib/prisma";
import { Prisma } from "@/db/generated/prisma";
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
    brand: z.string().min(1, "Brand should be at least 1 character long").optional(),
    servingSize: z.number().positive("Serving size must be positive"),
    servingUnit: z.string().min(1, "Serving unit is required"),
    calories: z.number().nonnegative("Calories cannot be negative"),
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
        calories: parsedArgs.data.calories,
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

export async function getFoodTemplates(args: GetFoodTemplateArgs) {
    try {
        logger.info("get food templates", {args});
        return await client.foodTemplate.findMany({ where: { userId: args.userId } });
    } catch (e) {
        logger.error("Failed to get food templates", { exception: e });
        throw e;
    }
}
