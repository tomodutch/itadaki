import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    return redirect(`/dashboard/${today}`);
}

export const metadata = {
    title: {
        default: "Dashboard | itadaki",
        template: "%s | itadaki",
    },
    description: "Your personal dashboard",
}