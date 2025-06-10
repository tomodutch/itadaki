// schemas/food.ts
import { z } from "zod";

export const foodTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().optional(),
  servingSize: z.coerce.number().nonnegative().optional(),
  servingUnit: z.string().optional(),
  calories: z.coerce.number().nonnegative().optional(),
});

export type FoodTemplateFormData = z.infer<typeof foodTemplateSchema>;
