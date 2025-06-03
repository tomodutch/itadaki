import ClientDiary from "@/components/client-diary";


export default function Diary() {
    return (
        <ClientDiary />
    );
}

export const metadata = {
    title: {
        default: "Dashboard | itadaki",
        template: "%s | itadaki",
    },
    description: "Your personal dashboard",
}