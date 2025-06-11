"use client";

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Search, Barcode, Plus } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { diaryEntrySchema, DiaryEntryFormData } from "@/lib/schema/diary";

import { Input } from "@/components/ui/input";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { FoodTemplate, DiaryEntryCategory, DiaryEntry } from "@/db/generated/prisma";
import { CategoryWithEntries } from "@/db/types";
export interface OnAddDiaryItem {
    servingSize: number,
    servings: number,
    foodTemplateId: string,
    categoryId: string
}
interface FoodDiaryProps {
    foodTemplates: FoodTemplate[],
    onAdd: (foodItem: OnAddDiaryItem) => Promise<void>,
    categorizedDiaryEntries: CategoryWithEntries[]
}

export function FoodDiary(props: FoodDiaryProps) {
    const [open, setOpen] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<FoodTemplate | null>(null);
    const [subDialogOpen, setSubDialogOpen] = useState(false);

    return (
        <>
            <Button
                className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg"
                size="icon"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <Plus />
            </Button>
            <DailySummary />
            <DiaryEntriesList groups={["Breakfast", "Lunch", "Dinner", "Snacks"]} groupedDiaryEntries={props.categorizedDiaryEntries} />

            <AddFoodTemplateDialog
                open={open}
                setOpen={setOpen}
                foodTemplates={props.foodTemplates}
                onSelectFoodTemplate={(selected) => {
                    setSelectedTemplate(selected);
                    setSubDialogOpen(true);
                }} />

            {selectedTemplate && (
                <FoodTemplateDetailsDialog
                    open={subDialogOpen}
                    setOpen={setSubDialogOpen}
                    selectedTemplate={selectedTemplate}
                    diaryCategories={props.categorizedDiaryEntries}
                    onAdd={async (i) => {
                        await props.onAdd(i);
                        setSubDialogOpen(false);
                        setSelectedTemplate(null);
                    }}
                />
            )}
        </>
    )
}

function DailySummary() {
    return (
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border py-3">
            <div className="mt-2 w-full text-sm text-muted-foreground font-medium">
                <div className="grid grid-cols-4 text-center">
                    <div>
                        Total<br />
                        <span className="text-foreground font-semibold">1,723 kcal</span>
                    </div>
                    <div>
                        Protein<br />
                        <span className="text-foreground font-semibold">122 g</span>
                    </div>
                    <div>
                        Carbs<br />
                        <span className="text-foreground font-semibold">144 g</span>
                    </div>
                    <div>
                        Fat<br />
                        <span className="text-foreground font-semibold">68 g</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
interface DiaryEntriesListProps {
    groups: string[],
    groupedDiaryEntries: CategoryWithEntries[]
}
function DiaryEntriesList(props: DiaryEntriesListProps) {
    return (
        <Accordion
            type="multiple"
            className="w-full"
            defaultValue={[]}
        >
            {
                props.groupedDiaryEntries.map((category) =>
                    <DiaryEntriesListGroup key={category.id} title={category.key} diaryEntries={category.diaryEntries} />
                )
            }
        </Accordion>
    );
}

interface DiaryEntriesListGroupProps {
    title: string,
    diaryEntries: DiaryEntry[]
}
function DiaryEntriesListGroup(props: DiaryEntriesListGroupProps) {
    return (
        <AccordionItem value={props.title}>
            <AccordionTrigger>
                <div className="mt-2 w-full text-sm text-muted-foreground font-medium">
                    <div className="grid grid-cols-5 text-left">
                        <div className="text-foreground">{props.title}</div>
                        <div>1,723 kcal</div>
                        <div>120 protein</div>
                        <div>260 carbs</div>
                        <div>90 fat</div>
                    </div>
                </div>

            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance text-sm text-muted-foreground font-medium">
                {
                    (props.diaryEntries).map((e) =>
                    (<div className="grid grid-cols-5 text-left" key={e.id}>
                        <span className="text-foreground">{e.name}</span>
                        <span>{e.calories} kcal</span>
                        <span>{e.protein || 0} protein</span>
                        <span>{e.carbs || 0} carbs</span>
                        <span>{e.fat || 0} fat</span>
                    </div>))
                }
            </AccordionContent>
        </AccordionItem>
    );
}

interface AddFoodTemplateDialogProps {
    open: boolean,
    setOpen: (state: boolean) => void,
    foodTemplates: FoodTemplate[],
    onSelectFoodTemplate: (selected: FoodTemplate) => void
}

function AddFoodTemplateDialog(props: AddFoodTemplateDialogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTab, setSearchTab] = useState("foods");
    const { open, setOpen } = props;

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                setOpen(state)
                if (!state) setSearchQuery("")
            }}
        >
            <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add to group</DialogTitle>
                </DialogHeader>

                <div className="relative mt-2">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="pl-10 pr-10"
                        placeholder="Search foods, meals or recipes"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Barcode className="absolute right-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>

                <Tabs value={searchTab} onValueChange={setSearchTab} className="pt-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="foods">Foods</TabsTrigger>
                        <TabsTrigger value="meals">Meals</TabsTrigger>
                        <TabsTrigger value="recipes">Recipes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="foods" className="mt-4 text-sm text-muted-foreground">
                        {
                            props.foodTemplates.map((t) => (
                                <Button
                                    key={t.id}
                                    variant="ghost"
                                    className="justify-between w-full"
                                    onClick={() => props.onSelectFoodTemplate(t)}>
                                    <span>{t.name}</span>
                                    <span className="text-sm text-muted-foreground">{t.calories} kcal</span>
                                </Button>
                            ))
                        }
                    </TabsContent>
                    <TabsContent value="meals" className="mt-4">(mock meals)</TabsContent>
                    <TabsContent value="recipes" className="mt-4">(mock recipes)</TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button onClick={() => setOpen(false)} variant="outline">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface FoodTemplateDetailsDialogProps {
    open: boolean,
    setOpen: (state: boolean) => void,
    selectedTemplate: FoodTemplate,
    diaryCategories: DiaryEntryCategory[],
    onAdd: (item: OnAddDiaryItem) => Promise<unknown>
}
function FoodTemplateDetailsDialog(props: FoodTemplateDetailsDialogProps) {
    const { open: subDialogOpen, setOpen: setSubDialogOpen, selectedTemplate } = props;
    const diaryEntryForm = useForm<DiaryEntryFormData>({
        resolver: zodResolver(diaryEntrySchema),
        defaultValues: {
            servings: 1,
            servingSize: 1
        },
    });

    const servings = diaryEntryForm.watch("servings");
    const servingSize = diaryEntryForm.watch("servingSize");
    const servingFactor = Number(servings || 0) * Number(servingSize || 0);

    async function onSubmit(values: DiaryEntryFormData) {
        if (!selectedTemplate) return;
        const diaryItem: OnAddDiaryItem = {
            servingSize: values.servingSize,
            servings: values.servings,
            categoryId: values.categoryId,
            foodTemplateId: selectedTemplate.id
        };

        await props.onAdd(diaryItem);
        diaryEntryForm.reset();
    }

    return (
        <Dialog open={subDialogOpen} onOpenChange={setSubDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add {selectedTemplate?.name}</DialogTitle>
                </DialogHeader>

                {selectedTemplate && (
                    <Form {...diaryEntryForm}>
                        <form onSubmit={diaryEntryForm.handleSubmit(onSubmit)}>
                            <div className="space-y-4 mt-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        name="servingSize"
                                        control={diaryEntryForm.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Serving Size</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="servings"
                                        control={diaryEntryForm.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Servings</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={diaryEntryForm.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meal Type</FormLabel>
                                            <FormControl>
                                                <select
                                                    {...field}
                                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                                    value={field.value ?? ""}
                                                >
                                                    <option value="">Select meal type</option>
                                                    {
                                                        props.diaryCategories.map((c) => <option key={c.id} value={c.id}>{c.key}</option>)
                                                    }
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="text-sm mt-2 space-y-1">
                                <div><strong>Preview:</strong></div>
                                <div>{selectedTemplate.calories * servingFactor} kcal</div>
                                <div>{(selectedTemplate.protein || 0) * servingFactor}g protein</div>
                                <div>{(selectedTemplate.carbs || 0) * servingFactor}g carbs</div>
                                <div>{(selectedTemplate.fat || 0) * servingFactor}g fat</div>
                            </div>
                            <DialogFooter className="mt-4">
                                <Button variant="ghost" type="button" onClick={() => setSubDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}