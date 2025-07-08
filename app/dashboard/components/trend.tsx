export const dynamic = "force-dynamic";

import BaseTrend from "@/components/trend";
import { createClient } from "@/lib/server";

type TrendProps = {
  type: "Income" | "Expense" | "Investment" | "Saving";
  range: string;
};

export default async function Trend({ type, range }: TrendProps) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc("calculate_total", {
      type_arg: type,
      range_arg: range,
    });

  if (error) {
    console.error("RPC Error:", error);
    throw new Error("Could not fetch the trend data");
  }

  const amount = data?.[0]?.current_amount ?? 0;
  const prevAmount = data?.[0]?.previous_amount ?? 0;

  return (
    <BaseTrend
      type={type}
      amount={amount}
      prevAmount={prevAmount}
    />
  );
}
