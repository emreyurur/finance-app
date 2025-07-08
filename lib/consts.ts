export const types = ["Income", "Expense", "Saving", "Investment"] as const;

export type Type = typeof types[number];

export const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other"
] as const;

export type Category = typeof categories[number];
