import { FoodDiaryWrapper } from "@/components/dashboard/food-diary-wrapper";
import { getFoodTemplatesForUser } from "@/lib/api/food";
import { getDiaryCategoriesAndEntries } from "@/lib/api/diary";
import { parseISO, isValid, startOfDay } from 'date-fns';

interface PageProps {
    params: { date: string };
}

export default async function Dashboard(props: PageProps) {
    const params = await props.params;
    const rawDate = typeof params.date === 'string' ? params.date : '';
    const parsed = parseISO(rawDate);
    const date = isValid(parsed) ? startOfDay(parsed) : startOfDay(new Date());

    const [foodTemplates, diaryEntries] = await Promise.all([
        getFoodTemplatesForUser(),
        getDiaryCategoriesAndEntries(date),
    ]);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Diary</h1>
            <p className="text-muted-foreground">Your personal diary entries will be displayed here.</p>
            <FoodDiaryWrapper foodTemplates={foodTemplates} diaryEntries={diaryEntries} />
            {/* <ClientDashboard /> */}
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