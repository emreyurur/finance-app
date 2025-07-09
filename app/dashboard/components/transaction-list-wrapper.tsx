import { fetchTransactions } from "@/lib/actions";
import TransactionList from "./transaction-list";

interface TransactionListWrapperProps {
  range: string;
}

export default async function TransactionListWrapper({ range }: TransactionListWrapperProps) {
  const transactions = await fetchTransactions(range);
  const formattedTransactions = transactions.map(transaction => ({
    ...transaction,
    category: transaction.category || undefined,
  }));
  return <TransactionList initialTransactions={formattedTransactions} key={range} range={range} />;
}
