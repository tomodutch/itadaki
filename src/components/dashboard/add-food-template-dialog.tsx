import { FoodTemplate } from "@/db/generated/prisma";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Barcode } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AddFoodTemplateDialogProps {
    open: boolean,
    setOpen: (state: boolean) => void,
    foodTemplates: FoodTemplate[],
    onSelectFoodTemplate: (selected: FoodTemplate) => void,
    onSearch: (query: string, signal: AbortSignal) => Promise<void>
}

export function AddFoodTemplateDialog(props: AddFoodTemplateDialogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTab, setSearchTab] = useState("foods");
    const { open, setOpen } = props;
    const abortControllerRef = useRef<AbortController | null>(null);

    // Debounced callback that triggers the search
    const debouncedSearch = useDebouncedCallback((query: string) => {
        // Cancel previous request if any
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        props.onSearch(query, controller.signal).catch((err) => {
            if (err.name === "AbortError") {
                return;
            }
            console.error(err);
        });
    }, 300);

    // Trigger the debounced search whenever searchQuery changes
    useEffect(() => {
        if (searchQuery.trim() === "") return;
        debouncedSearch(searchQuery);
        // Cleanup on unmount or query change
        return () => {
            abortControllerRef.current?.abort();
        };
    }, [searchQuery, debouncedSearch]);

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
