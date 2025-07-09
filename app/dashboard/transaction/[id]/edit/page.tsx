import TransactionForm from "@/app/dashboard/components/transaction-form";
import { createClient } from "@/lib/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: "Edit Transaction",
};

export default async function Page({ params: { id } }: PageProps) {
  const supabase = createClient();
  const { data: transaction, error } = await (await supabase)
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) notFound();

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
}
