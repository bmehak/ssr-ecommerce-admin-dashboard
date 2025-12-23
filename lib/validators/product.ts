import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().nonnegative("Stock must be 0 or more"),
});

export type ProductInput = z.infer<typeof productSchema>;
