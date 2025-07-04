import { DiaryEntry, FoodTemplate } from "@/db/generated/prisma";
import { CategoryWithEntries } from "@/db/types";
import { faker } from '@faker-js/faker';

export function createCategory(partial: Partial<CategoryWithEntries>): CategoryWithEntries {
    const defaultValue: CategoryWithEntries = {
        id: createRandomId(),
        key: "Breakfast",
        diaryEntries: [],
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    };
    return { ...defaultValue, ...partial };
}

export function createDiaryEntry(partial: Partial<DiaryEntry>): DiaryEntry {
    const defaultValues: DiaryEntry = {
        id: createRandomId(),
        name: faker.food.ingredient(),
        calories: faker.number.int({min: 10, max: 200}),
        userId: "me",
        date: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
        createdAt: new Date(),
        servingSize: 1,
        servingUnit: 'g',
        protein: faker.number.int({min: 0, max: 80}),
        carbs: faker.number.int({min: 0, max: 60}),
        sugar: null,
        fiber: null,
        fat: faker.number.int({min: 0, max: 50}),
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
        foodTemplateId: '',
        servings: 0,
        categoryId: ''
    };

    return { ...defaultValues, ...partial };
}

export function createFoodTemplate(partial: Partial<FoodTemplate>): FoodTemplate {
    const defaultValues: FoodTemplate = {
        name: faker.food.ingredient(),
        id: createRandomId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        userId: "",
        servingSize: 100,
        servingUnit: "g",
        calories: 10,
        protein: 8,
        carbs: 10,
        sugar: 2,
        fiber: null,
        fat: 3,
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
        brand: null,
        barCode: null,
        origin: "",
        originId: null
    };

    return { ...defaultValues, ...partial };
}

function createRandomId(): string {
    return Math.random().toString(36).substring(2, 10);
}
