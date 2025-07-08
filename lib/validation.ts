import { z } from "zod";
import { categories, types } from "./consts";

export const transactionSchema = z.object({
  type: z.enum(types),
  category: z
    .preprocess(
      (val) => (val && (val as string).length ? val : undefined),
      z.string().optional()
    ),
  amount: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number({
      required_error: "Amount is required",
    }).min(1, {
      message: "Amount must be at least 1",
    })
  ),
  description: z.string().optional(),
  created_at: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    {
      message: "Date needs to contain a valid date",
    }
  )
}).refine((data) => {
  if (data.type === "Expense") {
    return (
      data.category !== undefined &&
      (categories as readonly string[]).includes(data.category)
    );
  }
  return true;
}, {
  path: ["category"],
  message: "Category is required for Expense"
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
