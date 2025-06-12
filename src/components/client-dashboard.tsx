"use client";
import { FoodTemplate } from "@/db/generated/prisma";
import { CategoryWithEntries } from "@/db/types";
import { useUrlDate } from "./dashboard/use-url-date";
import { DatePicker } from "./dashboard/date-picker";
import { useState } from "react";
import { createDiaryEntryForUser, getDiaryCategoriesAndEntries } from "@/lib/api/diary";
import { createFoodTemplateFromUSDAForUser } from "@/lib/api/food";
import { FoodDiary } from "./dashboard/food-diary";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { AddFoodTemplateDialog } from "./dashboard/add-food-template-dialog";
import { FoodTemplateDetailsDialog, OnAddDiaryItem } from "./dashboard/food-template-details-dialog";
import { USDAFoodTemplate } from "@/lib/usda";
import { BarcodeScanDialog } from "./dashboard/barcode-scan-dialog";
import { getByCode, OFFFoodTemplate } from "@/lib/open-food-facts";

interface ClientDashboardProps {
    foodTemplates: FoodTemplate[],
    diaryEntries: CategoryWithEntries[]
}

export default function ClientDashboard({ foodTemplates, diaryEntries: initialEntries }: ClientDashboardProps) {
    const [date, setDate] = useUrlDate();
    const [searchResults, setSearchResults] = useState<(USDAFoodTemplate | OFFFoodTemplate | FoodTemplate)[]>([]);
    const [entries, setEntries] = useState(initialEntries);
    const [isDiaryLoading, setIsDiaryLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<FoodTemplate | OFFFoodTemplate | USDAFoodTemplate | null>(null);
    const [subDialogOpen, setSubDialogOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [barcodeScanning, setBarcodeScanning] = useState(false);

    const fetchEntriesForDate = async (newDate: Date) => {
        const updated = await getDiaryCategoriesAndEntries(newDate);
        setEntries(updated);
    };

    const handleDateChange = async (newDate: Date) => {
        setDate(newDate);
        try {
            setIsDiaryLoading(true);
            await fetchEntriesForDate(newDate);
        } finally {
            setIsDiaryLoading(false);
        }
    };

    const onAdd = async (item: OnAddDiaryItem) => {
        try {
            if (!selectedTemplate) return;
            setIsDiaryLoading(true);
            let foodTemplate: FoodTemplate | undefined;
            if ("id" in selectedTemplate) {
                foodTemplate = selectedTemplate;
            } else if (selectedTemplate.origin === "usda") {
                foodTemplate = await createFoodTemplateFromUSDAForUser(selectedTemplate);
            }

            if (!foodTemplate) return;

            await createDiaryEntryForUser({
                date,
                servings: item.servings,
                servingSize: item.servingSize,
                foodTemplateId: foodTemplate.id,
                categoryId: item.categoryId,
            });

            await fetchEntriesForDate(date);
        } finally {
            setIsDiaryLoading(false);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Diary</h1>
            <p className="text-muted-foreground">Your personal diary entries will be displayed here.</p>
            <DatePicker date={date} onChange={handleDateChange} />
            <FoodDiary
                isLoading={isDiaryLoading}
                foodTemplates={foodTemplates}
                categorizedDiaryEntries={entries}
            />

            <AddFoodTemplateDialog
                open={open}
                setOpen={(nextState) => {
                    setSearchResults([]);
                    setOpen(nextState);
                }}
                onBarcodeClick={() => {
                    setBarcodeScanning(true);
                }}
                foodTemplates={isSearching ? searchResults : foodTemplates}
                onSearch={async (query, signal) => {
                    if (query.trim().length === 0) {
                        setIsSearching(false);
                        return;
                    }

                    setIsSearching(true);
                    const params = new URLSearchParams({ query });
                    const result = await fetch(`/api/food/search?${params.toString()}`, { signal });
                    const body: USDAFoodTemplate[] = await result.json();
                    setSearchResults(body);
                }}
                onSelectFoodTemplate={(selected) => {
                    setSelectedTemplate(selected);
                    setSubDialogOpen(true);
                }} />

            {selectedTemplate && (
                <FoodTemplateDetailsDialog
                    open={subDialogOpen}
                    setOpen={setSubDialogOpen}
                    diaryCategories={entries}
                    name={selectedTemplate.name}
                    calories={selectedTemplate.calories}
                    protein={selectedTemplate.protein}
                    carbs={selectedTemplate.carbs}
                    fat={selectedTemplate.fat}
                    onAdd={async (i) => {
                        await onAdd(i);
                        setSubDialogOpen(false);
                        setSelectedTemplate(null);
                    }}
                />
            )}

            {
                barcodeScanning && (
                    <BarcodeScanDialog open={barcodeScanning} setOpen={function (state: boolean): void {
                        setBarcodeScanning(state);
                    }} onResult={async function (code: string) {
                        const resp = await getByCode(code);
                        if (resp) {
                            setBarcodeScanning(false);
                            setSelectedTemplate(resp);
                            setSubDialogOpen(true);
                        }
                    }} />
                )
            }

            <Button
                className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg"
                size="icon"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <Plus />
            </Button>
        </div>
    );
}
