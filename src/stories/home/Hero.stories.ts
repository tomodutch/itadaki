import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {Hero} from "@/components/home";

const meta = {
  title: 'Home/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isLoggedIn: false
  }
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false
  }
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true
  }
};
