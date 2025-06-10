import z from "zod";

export const diaryEntrySchema = z.object({
    servingSize: z.coerce.number().positive("Serving size must be positive"),
    servings: z.coerce.number().positive("Serving size must be positive"),
    categoryId: z.string(),
});

export type DiaryEntryFormData = z.infer<typeof diaryEntrySchema>;