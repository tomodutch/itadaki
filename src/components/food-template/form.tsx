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
      servingSize: 0,
      servingUnit: "g",
      calories: 0,
    },
  });

  async function onSubmit(values: FoodTemplateFormData) {
    // Convert to FormData for server action
    const fd = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      fd.append(key, value?.toString() ?? "")
    );
    await createFoodTemplateForUser(fd);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="servingSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serving Size</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="servingUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serving Unit</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
