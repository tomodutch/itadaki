import { getFoodTemplatesForUser } from "@/lib/api/food";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export default async function Food() {
    const foodTemplates = await getFoodTemplatesForUser();

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Food</h1>
            <p className="text-muted-foreground">Your personal collection of food entries will be displayed here.</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Calories</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {foodTemplates.map((food, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{food.name}</span>
                                    <span className="text-muted-foreground text-sm">{food.brand}</span>
                                </div>
                            </TableCell>
                            <TableCell>{food.calories}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Link href="/dashboard/food/new">
                <Button
                    className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg"
                    size="icon"
                >
                    <Plus />
                </Button>
            </Link>
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