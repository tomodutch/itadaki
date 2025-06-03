import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Home from '../app/page';

const meta = {
  title: 'Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
