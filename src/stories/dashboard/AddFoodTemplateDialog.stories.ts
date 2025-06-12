import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import * as factory from "../factory";
import { AddFoodTemplateDialog } from '@/components/dashboard/add-food-template-dialog';

const meta = {
    title: 'Dashboard/FoodTemplateDialog',
    component: AddFoodTemplateDialog,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        open: true,
        setOpen: fn(),
        foodTemplates: Array.from({length: 10}).map(() => factory.createFoodTemplate({})),
        onSelectFoodTemplate: fn(),
        onSearch: fn()
    }
} satisfies Meta<typeof AddFoodTemplateDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutFoodTemplates: Story = {
    args: {
        foodTemplates: [],
    }
};

export const WithFoodTemplates: Story = {
    args: {
        foodTemplates: Array.from({length: 10}).map(() => factory.createFoodTemplate({})),
    }
};
