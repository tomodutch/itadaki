"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { foodTemplateSchema, FoodTemplateFormData } from "@/lib/schema/food-template";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createFoodTemplateForUser } from "@/lib/api/food";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function FoodTemplateForm() {
  const form = useForm<FoodTemplateFormData>({
    resolver: zodResolver(foodTemplateSchema),
    defaultValues: {
      name: "",
      brand: "",
      servingSize: 1,
      servingUnit: "g",
      calories: 0,
    },
  });

  async function onSubmit(values: FoodTemplateFormData) {
    const fd = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      fd.append(key, value?.toString() ?? "")
    );
    await createFoodTemplateForUser(fd);
  }

  function renderField(name: keyof FoodTemplateFormData, label: string, type = "text") {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input type={type} {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {renderField("name", "Name")}
        {renderField("brand", "Brand")}
        {renderField("servingSize", "Serving Size", "number")}
        {renderField("servingUnit", "Serving Unit")}
        {renderField("barCode", "Bar Code")}
        {renderField("calories", "Calories", "number")}
        {renderField("protein", "Protein (g)", "number")}
        {renderField("carbs", "Carbohydrates (g)", "number")}
        {renderField("sugar", "Sugar (g)", "number")}
        {renderField("fiber", "Fiber (g)", "number")}
        {renderField("fat", "Fat (g)", "number")}
        {renderField("saturatedFat", "Saturated Fat (g)", "number")}
        {renderField("transFat", "Trans Fat (g)", "number")}
        {renderField("cholesterol", "Cholesterol (mg)", "number")}

        <details className="border rounded p-4">
          <summary className="cursor-pointer font-medium">Micronutrients</summary>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {renderField("sodium", "Sodium (mg)", "number")}
            {renderField("potassium", "Potassium (mg)", "number")}
            {renderField("vitaminA", "Vitamin A (mg)", "number")}
            {renderField("vitaminC", "Vitamin C (mg)", "number")}
            {renderField("vitaminD", "Vitamin D (mg)", "number")}
            {renderField("vitaminE", "Vitamin E (mg)", "number")}
            {renderField("vitaminK", "Vitamin K (mg)", "number")}
            {renderField("vitaminB1", "Vitamin B1 (mg)", "number")}
            {renderField("vitaminB2", "Vitamin B2 (mg)", "number")}
            {renderField("vitaminB3", "Vitamin B3 (mg)", "number")}
            {renderField("vitaminB5", "Vitamin B5 (mg)", "number")}
            {renderField("vitaminB6", "Vitamin B6 (mg)", "number")}
            {renderField("vitaminB7", "Vitamin B7 (mg)", "number")}
            {renderField("vitaminB9", "Vitamin B9 (mg)", "number")}
            {renderField("vitaminB12", "Vitamin B12 (mg)", "number")}
            {renderField("calcium", "Calcium (mg)", "number")}
            {renderField("iron", "Iron (mg)", "number")}
            {renderField("magnesium", "Magnesium (mg)", "number")}
            {renderField("phosphorus", "Phosphorus (mg)", "number")}
            {renderField("zinc", "Zinc (mg)", "number")}
            {renderField("copper", "Copper (mg)", "number")}
            {renderField("manganese", "Manganese (mg)", "number")}
            {renderField("selenium", "Selenium (mg)", "number")}
            {renderField("alcohol", "Alcohol (g)", "number")}
            {renderField("caffeine", "Caffeine (mg)", "number")}
          </div>
        </details>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
