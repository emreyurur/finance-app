import { z } from "zod";
import { categories, types } from "./consts";

export const transactionSchema = z.object({
  type: z.enum(types, {
    required_error: "Type is required",
  }),
  category: z.enum(categories, {
    required_error: "Category is required",
  }),
  amount: z.coerce.number().min(1, {
    message: "Amount must be at least 1",
  }),
  description: z.string().min(1, {
    message: "The description is required",
  }),
  created_at: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    {
      message: "Date needs to contain a valid date",
    }
  ),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
