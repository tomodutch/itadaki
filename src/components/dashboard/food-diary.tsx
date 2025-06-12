"use client";

import { useMemo } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { FoodTemplate, DiaryEntry } from "@/db/generated/prisma";
import { CategoryWithEntries } from "@/db/types";
import { LoadingSpinner } from "../loading-spinner";
interface FoodDiaryProps {
    foodTemplates: FoodTemplate[],
    categorizedDiaryEntries: CategoryWithEntries[]
    isLoading?: boolean
}

interface Summary {
    calories: number,
    protein: number,
    fat: number,
    carbs: number
}

export function FoodDiary(props: FoodDiaryProps) {
    const { summaries, dailySummary } = useMemo(() => {
        const summaries = new Map<string, Summary>();
        const dailySummary: Summary = {
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0
        };

        for (const category of props.categorizedDiaryEntries) {
            const summary: Summary = {
                calories: 0,
                protein: 0,
                fat: 0,
                carbs: 0
            };

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
    )
}

function formatNumber(n: number) {
    return n.toLocaleString(undefined, {
        maximumFractionDigits: 0
    })
}
interface DailySummaryProps {
    summary: Summary
}

function DailySummary(props: DailySummaryProps) {
    return (
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border py-3">
            <div className="mt-2 w-full text-sm text-muted-foreground font-medium">
                <div className="grid grid-cols-4 text-center">
                    <div>
                        Total<br />
                        <span className="text-foreground font-semibold">{formatNumber(props.summary.calories)} kcal</span>
                    </div>
                    <div>
                        Protein<br />
                        <span className="text-foreground font-semibold">{formatNumber(props.summary.protein)} g</span>
                    </div>
                    <div>
                        Carbs<br />
                        <span className="text-foreground font-semibold">{formatNumber(props.summary.carbs)} g</span>
                    </div>
                    <div>
                        Fat<br />
                        <span className="text-foreground font-semibold">{formatNumber(props.summary.fat)} g</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
interface DiaryEntriesListProps {
    groupedDiaryEntries: CategoryWithEntries[],
    summaries: Map<string, Summary>
}
function DiaryEntriesList(props: DiaryEntriesListProps) {
    return (
        <Accordion
            type="multiple"
            className="w-full"
            defaultValue={[]}
        >
            {
                props.groupedDiaryEntries.map((category) => {
                    const summary: Summary = props.summaries.get(category.id) || {
                        calories: 0,
                        fat: 0,
                        protein: 0,
                        carbs: 0
                    };

                    return (
                        <DiaryEntriesListGroup
                            key={category.id}
                            title={category.key}
                            diaryEntries={category.diaryEntries}
                            summary={summary} />)

                })
            }
        </Accordion>
    );
}
interface DiaryEntriesListGroupProps {
    title: string,
    diaryEntries: DiaryEntry[],
    summary: Summary,
}
function DiaryEntriesListGroup(props: DiaryEntriesListGroupProps) {
    const gridLayoutClasses = "grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 text-sm text-muted-foreground";
    return (
        <AccordionItem value={props.title} className="border border-border rounded-sm">
            <AccordionTrigger className="py-2 px-4">
                <div className="w-full">
                    <div className={gridLayoutClasses + " font-medium"}>
                        <span className="text-foreground">{props.title}</span>
                        <span>{formatNumber(props.summary.calories)} kcal</span>
                        <span className="hidden sm:block">{formatNumber(props.summary.protein)} protein</span>
                        <span className="hidden sm:block">{formatNumber(props.summary.carbs)} carbs</span>
                        <span className="hidden sm:block">{formatNumber(props.summary.fat)} fat</span>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 px-4 py-2 pr-12">
                {
                    props.diaryEntries.map((e) => (
                        <div className={gridLayoutClasses} key={e.id}>
                            <span className="text-foreground">{e.name}</span>
                            <span>{formatNumber(e.calories)} kcal</span>
                            <span className="hidden sm:block">{formatNumber(e.protein || 0)} protein</span>
                            <span className="hidden sm:block">{formatNumber(e.carbs || 0)} carbs</span>
                            <span className="hidden sm:block">{formatNumber(e.fat || 0)} fat</span>
                        </div>
                    ))
                }
            </AccordionContent>
        </AccordionItem>
    );
}
