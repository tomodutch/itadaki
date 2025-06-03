import ClientDashboard from "@/components/client-dashboard";


export default function Dashboard() {
    return (
        <ClientDashboard />
    );
}

export const metadata = {
    title: {
        default: "Dashboard | itadaki",
        template: "%s | itadaki",
    },
    description: "Your personal dashboard",
}