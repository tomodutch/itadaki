import FoodTemplateForm from "@/components/food-template/form";

export default function NewFood() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">New Food</h1>
            <p className="text-muted-foreground">Add a new food item to your personal collection</p>

            <FoodTemplateForm />
        </div>
    );
}