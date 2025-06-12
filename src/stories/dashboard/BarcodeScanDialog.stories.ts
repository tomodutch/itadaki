import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BarcodeScanDialog } from '@/components/dashboard/barcode-scan-dialog';
import { fn } from 'storybook/test';

const meta = {
    title: 'Dashboard/BarcodeScanDialog',
    component: BarcodeScanDialog,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        open: true,
        setOpen: fn(),
        onResult: fn()
    }
} satisfies Meta<typeof BarcodeScanDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutEntries: Story = {
    args: {
    }
};
