import { fetchTransactions } from "@/lib/actions";
import TransactionList from "./transaction-list";

interface TransactionListWrapperProps {
  range: string;
}

export default async function TransactionListWrapper({ range }: TransactionListWrapperProps) {
  const transactions = await fetchTransactions(range);
  return <TransactionList initialTransactions={transactions} key={range} range={range} />;
}
