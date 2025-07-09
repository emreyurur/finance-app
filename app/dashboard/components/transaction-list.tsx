"use client";

import Button from "@/components/button";
import Separator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { fetchTransactions } from "@/lib/actions";
import { groupAndSumTransactionsByDate } from "@/lib/utils";
import { useState } from "react";
import { Loader } from "lucide-react";

export type Transaction = {
  id: string;
  created_at: string;
  type: "Income" | "Expense" | "Saving" | "Investment";
  category?: string;
  description: string;
  amount: number;
};

export type TransactionListProps = {
  range: string;
  initialTransactions: Transaction[];
};

export default function TransactionList({
  range,
  initialTransactions,
}: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions
  );
  const [buttonHidden, setButtonHidden] = useState<boolean>(
    initialTransactions.length === 0
  );
  const [loading, setLoading] = useState<boolean>(false);

  const grouped = groupAndSumTransactionsByDate(transactions);

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    try {
      const nextTransactions = await fetchTransactions(
        range,
        transactions.length,
        10
      );
      setButtonHidden(nextTransactions.length === 0);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...nextTransactions.map(transaction => ({
          ...transaction,
          category: transaction.category ?? undefined,
        })),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoved = (id: string) => (): void => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} amount={amount} />
          <Separator />
          <section className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem
                description={""} {...transaction}
                onRemoved={handleRemoved(transaction.id)}                />
              </div>
            ))}
          </section>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No transactions found
        </div>
      )}
      {!buttonHidden && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={handleClick} disabled={loading}>
            <div className="flex items-center space-x-1">
              {loading && <Loader className="animate-spin" />}
              <div>Load More</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
