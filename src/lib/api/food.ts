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

    // Helper to safely get number from formData or undefined
    const getNumber = (key: string) => {
        const value = formData.get(key);
        if (typeof value === "string" && value.trim() !== "") {
            const n = Number(value);
            return isNaN(n) ? undefined : n;
        }
        return undefined;
    };

    const getString = (key: string) => {
        const value = formData.get(key);
        if (typeof value === "string" && value.trim() !== "") {
            return value.trim();
        }

        return undefined;
    }

    const rawData = {
        name: getString("name"),
        brand: getString("brand"),
        servingSize: getNumber("servingSize"),
        servingUnit: getString("servingUnit"),
        barCode: getString("barCode"),
        calories: getNumber("calories"),
        protein: getNumber("protein"),
        carbs: getNumber("carbs"),
        sugar: getNumber("sugar"),
        fiber: getNumber("fiber"),
        fat: getNumber("fat"),
        saturatedFat: getNumber("saturatedFat"),
        transFat: getNumber("transFat"),
        cholesterol: getNumber("cholesterol"),
        sodium: getNumber("sodium"),
        potassium: getNumber("potassium"),
        vitaminA: getNumber("vitaminA"),
        vitaminC: getNumber("vitaminC"),
        vitaminD: getNumber("vitaminD"),
        vitaminE: getNumber("vitaminE"),
        vitaminK: getNumber("vitaminK"),
        vitaminB1: getNumber("vitaminB1"),
        vitaminB2: getNumber("vitaminB2"),
        vitaminB3: getNumber("vitaminB3"),
        vitaminB5: getNumber("vitaminB5"),
        vitaminB6: getNumber("vitaminB6"),
        vitaminB7: getNumber("vitaminB7"),
        vitaminB9: getNumber("vitaminB9"),
        vitaminB12: getNumber("vitaminB12"),
        calcium: getNumber("calcium"),
        iron: getNumber("iron"),
        magnesium: getNumber("magnesium"),
        phosphorus: getNumber("phosphorus"),
        zinc: getNumber("zinc"),
        copper: getNumber("copper"),
        manganese: getNumber("manganese"),
        selenium: getNumber("selenium"),
        alcohol: getNumber("alcohol"),
        caffeine: getNumber("caffeine"),
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