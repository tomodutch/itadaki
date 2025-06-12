
import { FoodTemplate } from "@/db/generated/prisma";
import { OpenFoodFactsApiResponse } from "@/lib/types/open-food-facts";
import { fetchWithTimeout } from "./fetch";

export async function getByCode(code: string) {
        const url = `https://world.openfoodfacts.org/api/v2/product/${code}`;
    
    const options: RequestInit = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "User-Agent": "itadaki.app - itadaki@tomodutch.com"
        }
    };

    const resp = await fetchWithTimeout(url, options);
    if (resp.status !== 200) {
        return;
    }

    return mapOFFToFoodTemplate(await resp.json());
}

export type OFFFoodTemplate = Omit<FoodTemplate, "id" | "userId" | "brand" | "createdAt" | "deletedAt" | "updatedAt"> & { origin: "open-food-facts" }
export function mapOFFToFoodTemplate(data: OpenFoodFactsApiResponse): OFFFoodTemplate {
    const { product } = data;
    const n = product.nutriments;

    const foodTemplate: OFFFoodTemplate = {
        name: product.product_name,
        servingSize: typeof product.serving_quantity === "number" ? product.serving_quantity : Number.parseFloat(product.serving_quantity),
        servingUnit: product.serving_quantity_unit,
        barCode: product.code,
        calories: n["energy-kcal_serving"] ?? null,
        protein: n.proteins_serving ?? null,
        carbs: n.carbohydrates_serving ?? null,
        sugar: n.sugars_serving ?? null,
        fiber: n.fiber_serving ?? null,
        fat: n.fat_serving ?? null,
        saturatedFat: n["saturated-fat_serving"] ?? null,
        transFat: null, // Not present in `Nutriments`
        cholesterol: null, // Not present in `Nutriments`
        sodium: n.sodium_serving ?? null,
        potassium: null, // Not present in `Nutriments`
        vitaminA: null,
        vitaminC: null,
        vitaminD: null,
        vitaminE: null,
        vitaminK: null,
        vitaminB1: null,
        vitaminB2: null,
        vitaminB3: null,
        vitaminB5: null,
        vitaminB6: null,
        vitaminB7: null,
        vitaminB9: null,
        vitaminB12: null,
        calcium: null,
        iron: null,
        magnesium: null,
        phosphorus: null,
        zinc: null,
        copper: null,
        manganese: null,
        selenium: null,
        alcohol: null,
        caffeine: null,
        origin: "open-food-facts",
        originId: product.id
    };

    return foodTemplate;
}