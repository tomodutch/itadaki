import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DailySummary } from '@/components/dashboard/daily-summary';

const meta = {
    title: 'Dashboard/DailySummary',
    component: DailySummary,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        protein: {
            value: 180,
            max: 200
        },
        carbs: {
            value: 120,
            max: 300
        },
        fat: {
            value: 40,
            max: 100
        },
        calories: {
            value: 2100,
            max: 2300
        }
    }
} satisfies Meta<typeof DailySummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEverythingFull: Story = {
    args: {
        protein: {
            value: 10,
            max: 10
        },
        carbs: {
            value: 10,
            max: 10
        },
        fat: {
            value: 10,
            max: 10
        },
        calories: {
            value: 10,
            max: 10
        }
    }
};

export const WithSurplus: Story = {
    args: {
        protein: {
            value: 18,
            max: 10
        },
        carbs: {
            value: 15,
            max: 10
        },
        fat: {
            value: 16,
            max: 10
        },
        calories: {
            value: 14,
            max: 10
        }
    }
};

export const WithEmpty: Story = {
    args: {
        protein: {
            value: 0,
            max: 0
        },
        carbs: {
            value: 0,
            max: 0
        },
        fat: {
            value: 0,
            max: 0
        },
        calories: {
            value: 0,
            max: 0
        }
    }
};

