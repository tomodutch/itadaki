"use client";

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
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
export interface OnAddDiaryItem {
    servingSize: number,
    servings: number,
    foodTemplateId: string,
    categoryId: string
}
interface FoodDiaryProps {
    diaryEntries: { [key: string]: DiaryEntry[] },
    foodTemplates: FoodTemplate[],
    diaryCategories: DiaryEntryCategory[],
    onAdd: (foodItem: OnAddDiaryItem) => Promise<DiaryEntry>
}

export function FoodDiary(props: FoodDiaryProps) {
    const [open, setOpen] = useState(false)
    const [searchTab, setSearchTab] = useState("foods")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTemplate, setSelectedTemplate] = useState<FoodTemplate | null>(null);
    const [subDialogOpen, setSubDialogOpen] = useState(false);
    const [groupedDiaryEntries, setGroupedDiaryEntries] = useState(props.diaryEntries);

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

        const fd = new FormData();
        Object.entries(values).forEach(([key, value]) =>
            fd.append(key, value?.toString() ?? "")
        );

        const diaryItem: OnAddDiaryItem = {
            servingSize,
            servings,
            categoryId: values.categoryId,
            foodTemplateId: selectedTemplate.id
        };

        const newEntry = await props.onAdd(diaryItem);

        setSubDialogOpen(false);
        setSelectedTemplate(null);
        diaryEntryForm.reset();

        setGroupedDiaryEntries({
            ...groupedDiaryEntries, "Breakfast": [
                ...groupedDiaryEntries["Breakfast"],
                newEntry
            ]
        });
    }

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

            <Accordion
                type="multiple"
                className="w-full"
                defaultValue={["breakfast"]}
            >
                <AccordionItem value="breakfast">
                    <AccordionTrigger>
                        <div className="mt-2 w-full text-sm text-muted-foreground font-medium">
                            <div className="grid grid-cols-5 text-left">
                                <div className="text-foreground">Breakfast</div>
                                <div>1,723 kcal</div>
                                <div>120 protein</div>
                                <div>260 carbs</div>
                                <div>90 fat</div>
                            </div>
                        </div>

                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance text-sm text-muted-foreground font-medium">
                        {
                            (groupedDiaryEntries["Breakfast"] || []).map((e) =>
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
                <AccordionItem value="lunch">
                    <AccordionTrigger>Lunch</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="dinner">
                    <AccordionTrigger>Dinner</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="snack">
                    <AccordionTrigger>Snack</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

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
                                        onClick={() => {
                                            setSelectedTemplate(t);
                                            setSubDialogOpen(true);
                                        }}
                                    >
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
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                    </Button>
                </DialogTrigger>
            </Dialog>

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
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Serving Size</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            defaultValue={field.value}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            name="servings"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Servings</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            defaultValue={field.value}
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
        </>
    )
}
