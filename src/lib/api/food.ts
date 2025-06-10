"use server";

import { getFoodTemplates, createFoodTemplate } from "@/db/queries/food";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import logger from "@/lib/logger";

export async function getFoodTemplatesForUser(userId: string) {
    return await getFoodTemplates({
        userId
    });
}

export async function createFoodTemplateForUser(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        logger.info("Tried to create a food template while not authenticated. Redirecting to home");
        return redirect("/");
    }

    const rawData = {
        name: formData.get("name"),
        servingSize: formData.get("servingSize"),
        servingUnit: formData.get("servingUnit"),
        calories: formData.get("calories")
    }
    await createFoodTemplate({
        name: typeof rawData.name === "string" ? rawData.name.trim() : "",
        servingSize: typeof rawData.servingSize === "string" ? Number(rawData.servingSize) : NaN,
        servingUnit: typeof rawData.servingUnit === "string" ? rawData.servingUnit.trim() : "",
        calories: typeof rawData.calories === "string" ? Number(rawData.calories) : NaN,
        userId: session.user.id
    });

    redirect("/dashboard/food");
}