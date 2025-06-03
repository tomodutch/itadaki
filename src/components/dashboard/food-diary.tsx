import { useState } from "react"
import { format, addDays, subDays } from "date-fns"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Barcode, Plus, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

const groups = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const
type Group = typeof groups[number]

type FoodItem = {
    title: string
    amount: string
    calories: number
}

export function FoodDiary() {
    const [open, setOpen] = useState(false)
    const [activeGroup, setActiveGroup] = useState<Group>("Breakfast")
    const [items, setItems] = useState<Record<Group, FoodItem[]>>({
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Snacks: [],
    })

    const [searchTab, setSearchTab] = useState("foods")
    const [searchQuery, setSearchQuery] = useState("")
    const [date, setDate] = useState<Date | undefined>(new Date())

    const handleAdd = (item: FoodItem) => {
        if (!activeGroup) return
        setItems((prev) => ({
            ...prev,
            [activeGroup]: [...prev[activeGroup], item],
        }))
        setOpen(false)
    }

    const goToPreviousDay = () => setDate((d) => (d ? subDays(d, 1) : new Date()))
    const goToNextDay = () => setDate((d) => (d ? addDays(d, 1) : new Date()))

    return (
        <>
            {/* Date selector with arrows, neat row and spacing */}
            <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border py-3">
                <div className="flex items-center justify-center gap-2 px-4">
                    <Button variant="ghost" size="icon" onClick={goToPreviousDay}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2 px-4 py-2 text-base font-medium">
                                <CalendarIcon className="w-4 h-4" />
                                {format(date || new Date(), "EEE, MMM d, yyyy")}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>

                    <Button variant="ghost" size="icon" onClick={goToNextDay}>
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>

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

            {/* Tabs */}
            <Tabs value={activeGroup ?? ""} onValueChange={(val) => setActiveGroup(val as Group)} className="flex flex-col gap-4">
                <TabsList className="grid grid-cols-4 border-b border-gray-200 w-full">
                    {groups.map((group) => (
                        <TabsTrigger
                            key={group}
                            value={group}
                        >
                            {group}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {groups.map((group) => (
                    <TabsContent key={group} value={group} className="p-4">
                        <Card className="shadow-none border border-gray-100 rounded-md">
                            <CardContent className="flex flex-col space-y-3 text-sm p-4">
                                {items[group].length === 0 ? (
                                    <p className="text-muted-foreground">No items added yet.</p>
                                ) : (
                                    items[group].map((item, i) => (
                                        <div key={i} className="flex justify-between">
                                            <div>
                                                <p className="font-semibold leading-none">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">{item.amount}</p>
                                            </div>
                                            <div className="text-sm font-semibold text-right whitespace-nowrap">
                                                {item.calories} kcal
                                            </div>
                                        </div>
                                    ))
                                )}
                            </CardContent>

                            <CardFooter className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                                <Dialog
                                    open={open && activeGroup === group}
                                    onOpenChange={(state) => {
                                        setOpen(state)
                                        if (!state) setSearchQuery("")
                                    }}
                                >
                                    <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-auto">
                                        <DialogHeader>
                                            <DialogTitle>Add to {group}</DialogTitle>
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
                                                {/* Mock search result */}
                                                <Button
                                                    onClick={() =>
                                                        handleAdd({
                                                            title: "Boiled Egg",
                                                            amount: "1 large",
                                                            calories: 78,
                                                        })
                                                    }
                                                >
                                                    Add Boiled Egg
                                                </Button>
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
                                                setActiveGroup(group)
                                                setOpen(true)
                                            }}
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Add
                                        </Button>
                                    </DialogTrigger>
                                </Dialog>
                                <div className="text-sm font-medium text-muted-foreground">Total: 520 kcal</div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </>
    )
}