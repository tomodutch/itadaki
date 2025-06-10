import ClientDashboard from "@/components/client-dashboard";
import { FoodDiaryWrapper } from "@/components/dashboard/food-diary-wrapper";
import { ensureUserId } from "@/lib/auth";
import { getFoodTemplatesForUser } from "@/lib/api/food";
import { getDiaryCategories, getDiaryEntriesForUser } from "@/lib/api/diary";
import { DiaryEntry } from "@/db/generated/prisma";

export default async function Dashboard() {
    const userId = await ensureUserId();
    const foodTemplates = await getFoodTemplatesForUser(userId);
    const diaryCategories = (await getDiaryCategories());
    const categories = new Map<string, string>();
    diaryCategories.forEach((c) => {
        categories.set(c.id, c.key);
    });
    const diaryEntries = (await getDiaryEntriesForUser({ userId, day: new Date() }))
        .reduce((acc, entry) => {
            const key = categories.get(entry.categoryId) || 'uncategorized';
            if (!acc[key]) acc[key] = [];
            acc[key].push(entry);
            return acc;
        }, {} as { [key: string]: DiaryEntry[] });

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Diary</h1>
            <p className="text-muted-foreground">Your personal diary entries will be displayed here.</p>
            <FoodDiaryWrapper foodTemplates={foodTemplates} diaryCategories={diaryCategories} diaryEntries={diaryEntries} />
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