import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FoodDiary } from "@/components/dashboard/food-diary";
import * as factory from "../factory";
import { fn } from 'storybook/test';

const meta = {
    title: 'Dashboard/FoodDiary',
    component: FoodDiary,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        onAdd: fn(),
        foodTemplates: [
            factory.createFoodTemplate({ name: "chicken" }),
            factory.createFoodTemplate({ name: "browny" }),
            factory.createFoodTemplate({ name: "tofu" }),
            factory.createFoodTemplate({ name: "pizza" }),
            factory.createFoodTemplate({ name: "high protein milk" }),
        ],
        categorizedDiaryEntries: [
            factory.createCategory({ key: "Breakfast" }),
            factory.createCategory({ key: "Lunch" }),
            factory.createCategory({ key: "Dinner" }),
            factory.createCategory({ key: "Snack" }),
        ],
        isLoading: false
    }
} satisfies Meta<typeof FoodDiary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutEntries: Story = {
    args: {
    }
};

export const WithEntries: Story = {
    args: {
        categorizedDiaryEntries: [
            factory.createCategory({
                key: "Breakfast", diaryEntries: Array.from({length: 8}).map(() => factory.createDiaryEntry({}))
            }),
            factory.createCategory({ key: "Lunch", diaryEntries: Array.from({length: 6}).map(() => factory.createDiaryEntry({})) }),
            factory.createCategory({ key: "Dinner", diaryEntries: Array.from({length: 4}).map(() => factory.createDiaryEntry({})) }),
            factory.createCategory({ key: "Snack", diaryEntries: Array.from({length: 3}).map(() => factory.createDiaryEntry({})) }),
        ],
    }
};

export const WithFractions: Story = {
    args: {
        categorizedDiaryEntries: [
            factory.createCategory({
                key: "Breakfast", diaryEntries: Array.from({length: 8}).map(() => factory.createDiaryEntry({}))
            }),
            factory.createCategory({ key: "Lunch", diaryEntries: Array.from({length: 6}).map(() => factory.createDiaryEntry({
                calories: 0.00000001,
                protein: 0.2,
                fat: 0.99,
                carbs: 20.1111111
            })) }),
            factory.createCategory({ key: "Dinner", diaryEntries: Array.from({length: 4}).map(() => factory.createDiaryEntry({})) }),
            factory.createCategory({ key: "Snack", diaryEntries: Array.from({length: 3}).map(() => factory.createDiaryEntry({})) }),
        ],
    }
};

export const IsLoading: Story = {
    args: {
        isLoading: true
    }
}
