"use server";

import { getFoodTemplates, createFoodTemplate } from "@/db/queries/food";
import { auth, ensureUserId } from "@/lib/auth";
import { redirect } from "next/navigation";
import logger from "@/lib/logger";
import {getString, getNumber} from "./form-helpers";

export async function getFoodTemplatesForUser() {
    const userId = await ensureUserId();
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
        name: getString(formData, "name"),
        brand: getString(formData, "brand"),
        servingSize: getNumber(formData, "servingSize"),
        servingUnit: getString(formData, "servingUnit"),
        barCode: getString(formData, "barCode"),
        calories: getNumber(formData, "calories"),
        protein: getNumber(formData, "protein"),
        carbs: getNumber(formData, "carbs"),
        sugar: getNumber(formData, "sugar"),
        fiber: getNumber(formData, "fiber"),
        fat: getNumber(formData, "fat"),
        saturatedFat: getNumber(formData, "saturatedFat"),
        transFat: getNumber(formData, "transFat"),
        cholesterol: getNumber(formData, "cholesterol"),
        sodium: getNumber(formData, "sodium"),
        potassium: getNumber(formData, "potassium"),
        vitaminA: getNumber(formData, "vitaminA"),
        vitaminC: getNumber(formData, "vitaminC"),
        vitaminD: getNumber(formData, "vitaminD"),
        vitaminE: getNumber(formData, "vitaminE"),
        vitaminK: getNumber(formData, "vitaminK"),
        vitaminB1: getNumber(formData, "vitaminB1"),
        vitaminB2: getNumber(formData, "vitaminB2"),
        vitaminB3: getNumber(formData, "vitaminB3"),
        vitaminB5: getNumber(formData, "vitaminB5"),
        vitaminB6: getNumber(formData, "vitaminB6"),
        vitaminB7: getNumber(formData, "vitaminB7"),
        vitaminB9: getNumber(formData, "vitaminB9"),
        vitaminB12: getNumber(formData, "vitaminB12"),
        calcium: getNumber(formData, "calcium"),
        iron: getNumber(formData, "iron"),
        magnesium: getNumber(formData, "magnesium"),
        phosphorus: getNumber(formData, "phosphorus"),
        zinc: getNumber(formData, "zinc"),
        copper: getNumber(formData, "copper"),
        manganese: getNumber(formData, "manganese"),
        selenium: getNumber(formData, "selenium"),
        alcohol: getNumber(formData, "alcohol"),
        caffeine: getNumber(formData, "caffeine"),
    };

    await createFoodTemplate({
        name: typeof rawData.name === "string" ? rawData.name.trim() : "",
        brand: typeof rawData.brand === "string" ? rawData.brand.trim() : undefined,
        servingSize: rawData.servingSize ?? NaN,
        servingUnit: typeof rawData.servingUnit === "string" ? rawData.servingUnit.trim() : "",
        barCode: typeof rawData.barCode === "string" ? rawData.barCode.trim() : undefined,
        calories: rawData.calories ?? NaN,
        protein: rawData.protein,
        carbs: rawData.carbs,
        sugar: rawData.sugar,
        fiber: rawData.fiber,
        fat: rawData.fat,
        saturatedFat: rawData.saturatedFat,
        transFat: rawData.transFat,
        cholesterol: rawData.cholesterol,
        sodium: rawData.sodium,
        potassium: rawData.potassium,
        vitaminA: rawData.vitaminA,
        vitaminC: rawData.vitaminC,
        vitaminD: rawData.vitaminD,
        vitaminE: rawData.vitaminE,
        vitaminK: rawData.vitaminK,
        vitaminB1: rawData.vitaminB1,
        vitaminB2: rawData.vitaminB2,
        vitaminB3: rawData.vitaminB3,
        vitaminB5: rawData.vitaminB5,
        vitaminB6: rawData.vitaminB6,
        vitaminB7: rawData.vitaminB7,
        vitaminB9: rawData.vitaminB9,
        vitaminB12: rawData.vitaminB12,
        calcium: rawData.calcium,
        iron: rawData.iron,
        magnesium: rawData.magnesium,
        phosphorus: rawData.phosphorus,
        zinc: rawData.zinc,
        copper: rawData.copper,
        manganese: rawData.manganese,
        selenium: rawData.selenium,
        alcohol: rawData.alcohol,
        caffeine: rawData.caffeine,
        userId: session.user.id,
    });

    redirect("/dashboard/food");
}