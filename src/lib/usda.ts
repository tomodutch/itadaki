import { FoodTemplate } from "@/db/generated/prisma";

export type USDAFoodTemplate = Omit<FoodTemplate, "id" | "userId" | "brand" | "createdAt" | "deletedAt" | "updatedAt"> & { origin: "usda" }

export function mapResponseToFoodTemplates(data: FoodSearchResponse): USDAFoodTemplate[] {
    const foodTemplates: USDAFoodTemplate[] = [];
    for (const food of data.foods) {
        const foodTemplate: USDAFoodTemplate = {
            name: food.commonNames || food.description,
            servingSize: 100,
            servingUnit: "g",
            barCode: null,
            calories: 0,
            protein: null,
            carbs: null,
            sugar: null,
            fiber: null,
            fat: null,
            saturatedFat: null,
            transFat: null,
            cholesterol: null,
            sodium: null,
            potassium: null,
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
            origin: "usda",
            originId: food.fdcId.toString()
        };

        for (const nutrient of food.foodNutrients) {
            const field = nutrientIdToFieldMap[nutrient.nutrientId];
            if (field && typeof nutrient.value === "number") {
                foodTemplate[field] = nutrient.value;
            }

            if ([2047, 1008].indexOf(nutrient.nutrientId) > -1 && typeof nutrient.value === "number") {
                foodTemplate.calories = nutrient.value;
            }
        }

        foodTemplates.push(foodTemplate);
    }
    return foodTemplates;
}

export interface FoodSearchResponse {
    totalHits: number;
    currentPage: number;
    totalPages: number;
    pageList: number[];
    foodSearchCriteria: FoodSearchCriteria;
    foods: Food[];
}

export interface FoodSearchCriteria {
    dataType: string[];       // e.g. ["Foundation"]
    query: string;            // e.g. "lentil"
    generalSearchInput: string;
    pageNumber: number;
    sortBy: string;           // e.g. "dataType.keyword"
    sortOrder: string;        // e.g. "asc"
    numberOfResultsPerPage: number;
    pageSize: number;
    requireAllWords: boolean;
    foodTypes: string[];      // e.g. ["Foundation"]
}

export interface Food {
    fdcId: number;
    description: string;
    commonNames: string;
    additionalDescriptions: string;
    dataType: string;
    ndbNumber: number;
    publishedDate: string;            // ISO date string
    foodCategory: string;
    mostRecentAcquisitionDate: string; // ISO date string
    allHighlightFields: string;
    score: number;
    microbes: unknown[];
    foodNutrients: FoodNutrient[];
}

export interface FoodNutrient {
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    derivationCode: string;
    derivationDescription: string;
    derivationId: number;
    value: number;
    foodNutrientSourceId: number;
    foodNutrientSourceCode: string;
    foodNutrientSourceDescription: string;
    rank: number;
    indentLevel: number;
    foodNutrientId: number;
    dataPoints: number;
    min: number;
    max: number;
    median: number;
}

type NumericFoodTemplateFields = {
    [K in keyof FoodTemplate]: FoodTemplate[K] extends number | null ? K : never;
}[keyof FoodTemplate];

const nutrientIdToFieldMap: Record<number, NumericFoodTemplateFields> = {
    1003: "protein",
    1004: "fat",
    1005: "carbs",
    2000: "sugar",
    1079: "fiber",
    1258: "saturatedFat",
    1257: "transFat",
    1253: "cholesterol",
    1093: "sodium",
    1092: "potassium",
    1106: "vitaminA",
    1162: "vitaminC",
    1114: "vitaminD",
    1109: "vitaminE",
    1185: "vitaminK",
    1165: "vitaminB1",
    1166: "vitaminB2",
    1167: "vitaminB3",
    1170: "vitaminB5",
    1175: "vitaminB6",
    1176: "vitaminB7",
    1177: "vitaminB9",
    1178: "vitaminB12",
    1087: "calcium",
    1089: "iron",
    1090: "magnesium",
    1091: "phosphorus",
    1095: "zinc",
    1098: "copper",
    1101: "manganese",
    1103: "selenium",
    1100: "alcohol",
    1057: "caffeine"
};
