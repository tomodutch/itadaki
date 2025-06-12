import { FoodTemplate, DiaryEntryCategory } from "@/db/generated/prisma";
import { DiaryEntryFormData, diaryEntrySchema } from "@/lib/schema/diary";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

export interface OnAddDiaryItem {
    servingSize: number,
    servings: number,
    categoryId: string
}

type FoodTemplateDetailsDialogProps = {
    open: boolean,
    setOpen: (state: boolean) => void,
    diaryCategories: DiaryEntryCategory[],
    onAdd: (item: OnAddDiaryItem) => Promise<unknown>
} & Pick<FoodTemplate, "name" | "calories" | "fat" | "carbs" | "protein">

export function FoodTemplateDetailsDialog(props: FoodTemplateDetailsDialogProps) {
    const { open: subDialogOpen, setOpen: setSubDialogOpen } = props;
    const { name, protein, calories, fat, carbs } = props;
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
        const diaryItem: OnAddDiaryItem = {
            servingSize: values.servingSize,
            servings: values.servings,
            categoryId: values.categoryId,
        };

        await props.onAdd(diaryItem);
        diaryEntryForm.reset();
    }

    return (
        <Dialog open={subDialogOpen} onOpenChange={setSubDialogOpen}>
            <DialogContent className="w-full h-full sm:max-w-full sm:max-h-full lg:max-w-[60vw] lg:max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add {name}</DialogTitle>
                </DialogHeader>

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
                            <div>{calories * servingFactor} kcal</div>
                            <div>{(protein || 0) * servingFactor}g protein</div>
                            <div>{(carbs || 0) * servingFactor}g carbs</div>
                            <div>{(fat || 0) * servingFactor}g fat</div>
                        </div>
                        <DialogFooter className="mt-4">
                            <Button variant="ghost" type="button" onClick={() => setSubDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}