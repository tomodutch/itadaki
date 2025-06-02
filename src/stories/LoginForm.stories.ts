import {LoginForm} from "@/components/login-form";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
    title: 'Example/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
    }
}