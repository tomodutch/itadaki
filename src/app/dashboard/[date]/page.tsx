import ClientDashboard from "@/components/client-dashboard";
import { FoodDiaryWrapper } from "@/components/dashboard/food-diary-wrapper";

export default async function Dashboard() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Diary</h1>
            <p className="text-muted-foreground">Your personal diary entries will be displayed here.</p>
            <FoodDiaryWrapper />
            <ClientDashboard />
        </div>
    );
}

export const metadata = {
    title: {
        default: "Dashboard | itadaki",
        template: "%s | itadaki",
    },
    description: "Your personal dashboard",
}