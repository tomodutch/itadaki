"use client";

import { createContext, useContext, useMemo } from "react"
import { FoodTemplate, DiaryEntry } from "@/db/generated/prisma";
import { CategoryWithEntries } from "@/db/types";
import { LoadingSpinner } from "../loading-spinner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddEntryPopover } from "./add-entry-popover";

// --- Contexts ---
const FoodTemplatesContext = createContext<FoodTemplate[]>([]);
function useFoodTemplates() {
    return useContext(FoodTemplatesContext);
}

interface FoodDiaryActions {
    onAdd: (foodTemplate: FoodTemplate, categoryId: string) => void;
}

const FoodDiaryActionsContext = createContext<FoodDiaryActions | undefined>(undefined);
function useFoodDiaryActions() {
    const ctx = useContext(FoodDiaryActionsContext);
    if (!ctx) throw new Error("useFoodDiaryActions must be used within FoodDiaryActionsContext.Provider");
    return ctx;
}

// --- Props ---
interface FoodDiaryProps {
    foodTemplates: FoodTemplate[],
    categorizedDiaryEntries: CategoryWithEntries[]
    isLoading?: boolean,
    onAdd: (foodTemplate: FoodTemplate, categoryId: string) => void
}

interface Summary {
    calories: number,
    protein: number,
    fat: number,
    carbs: number
}

// --- Main Component ---
export function FoodDiary(props: FoodDiaryProps) {
    const { summaries, dailySummary } = useMemo(() => {
        const summaries = new Map<string, Summary>();
        const dailySummary: Summary = {
            calories: 0, protein: 0, fat: 0, carbs: 0
        };

        for (const category of props.categorizedDiaryEntries) {
            const summary: Summary = { calories: 0, protein: 0, fat: 0, carbs: 0 };

            for (const diaryEntry of category.diaryEntries) {
                summary.calories += diaryEntry.calories;
                summary.protein += diaryEntry.protein || 0;
                summary.fat += diaryEntry.fat || 0;
                summary.carbs += diaryEntry.carbs || 0;
            }

            dailySummary.calories += summary.calories;
            dailySummary.protein += summary.protein;
            dailySummary.fat += summary.fat;
            dailySummary.carbs += summary.carbs;

            summaries.set(category.id, summary);
        }
        return { summaries, dailySummary };
    }, [props.categorizedDiaryEntries]);

    return (
        <FoodTemplatesContext.Provider value={props.foodTemplates}>
            <FoodDiaryActionsContext.Provider value={{ onAdd: props.onAdd }}>
                <div className="relative">
                    <DailySummary summary={dailySummary} />
                    <DiaryEntriesList groupedDiaryEntries={props.categorizedDiaryEntries} summaries={summaries} />
                    {props.isLoading && (
                        <div
                            className="absolute rounded-lg inset-0 bg-black/5 flex justify-center items-center z-50 pointer-events-auto"
                            aria-busy="true"
                            aria-label="Loading"
                        >
                            <LoadingSpinner />
                        </div>
                    )}
                </div>
            </FoodDiaryActionsContext.Provider>
        </FoodTemplatesContext.Provider>
    );
}

function formatNumber(n: number) {
    return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

// --- Daily Summary ---
interface DailySummaryProps { summary: Summary }

function DailySummary(props: DailySummaryProps) {
    return (
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border py-3">
            <div className="mt-2 w-full text-sm text-muted-foreground font-medium">
                <div className="grid grid-cols-4 text-center">
                    <div>Total<br /><span className="text-foreground font-semibold">{formatNumber(props.summary.calories)} kcal</span></div>
                    <div>Protein<br /><span className="text-foreground font-semibold">{formatNumber(props.summary.protein)} g</span></div>
                    <div>Carbs<br /><span className="text-foreground font-semibold">{formatNumber(props.summary.carbs)} g</span></div>
                    <div>Fat<br /><span className="text-foreground font-semibold">{formatNumber(props.summary.fat)} g</span></div>
                </div>
            </div>
        </div>
    );
}

// --- Entries List ---
interface DiaryEntriesListProps {
    groupedDiaryEntries: CategoryWithEntries[],
    summaries: Map<string, Summary>
}

function DiaryEntriesList(props: DiaryEntriesListProps) {
    return (
        <div className="flex flex-col gap-4">
            {props.groupedDiaryEntries.map((category) => {
                const summary = props.summaries.get(category.id) || {
                    calories: 0, fat: 0, protein: 0, carbs: 0,
                };

                return (
                    <DiaryEntriesCardGroup
                        key={category.id}
                        categoryId={category.id}
                        title={category.key}
                        diaryEntries={category.diaryEntries}
                        summary={summary}
                    />
                );
            })}
        </div>
    );
}

// --- Card Group ---
interface DiaryEntriesCardGroupProps {
    categoryId: string,
    title: string,
    diaryEntries: DiaryEntry[],
    summary: Summary,
}

function DiaryEntriesCardGroup(props: DiaryEntriesCardGroupProps) {
    const foodTemplates = useFoodTemplates();
    const { onAdd } = useFoodDiaryActions();

    const gridLayoutClasses = "grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm text-muted-foreground";

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-foreground">{props.title}</CardTitle>
                    <AddEntryPopover
                        foodTemplates={foodTemplates}
                        onAdd={(foodTemplate) => onAdd(foodTemplate, props.categoryId)}
                    />
                </div>
                <div className={gridLayoutClasses + " font-medium mt-2"}>
                    <span className="text-foreground">Total</span>
                    <span>{formatNumber(props.summary.calories)} kcal</span>
                    <span className="hidden sm:block">{formatNumber(props.summary.protein)} protein</span>
                    <span className="hidden sm:block">{formatNumber(props.summary.carbs)} carbs</span>
                    <span className="hidden sm:block">{formatNumber(props.summary.fat)} fat</span>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 mt-2">
                {props.diaryEntries.map((entry) => (
                    <div className={gridLayoutClasses} key={entry.id}>
                        <span className="text-foreground">{entry.name}</span>
                        <span>{formatNumber(entry.calories)} kcal</span>
                        <span className="hidden sm:block">{formatNumber(entry.protein || 0)} protein</span>
                        <span className="hidden sm:block">{formatNumber(entry.carbs || 0)} carbs</span>
                        <span className="hidden sm:block">{formatNumber(entry.fat || 0)} fat</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
