import { getFoodTemplatesForUser } from "@/lib/api/food";
import { getDiaryCategoriesAndEntries } from "@/lib/api/diary";
import { parseISO, isValid, startOfDay } from 'date-fns';
import ClientDashboard from "@/components/client-dashboard";
interface PageProps {
    params: Promise<{ date: string }>;
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
        <ClientDashboard foodTemplates={foodTemplates} diaryEntries={diaryEntries} />
    );
}

export const metadata = {
    title: {
        default: "Dashboard | itadaki",
        template: "%s | itadaki",
    },
    description: "Your personal dashboard",
}