'use client'

import { useEffect, useState } from "react";
import TransactionItem from "@/components/transaction-item";
import Skeleton from "@/components/skeleton";

export interface Transaction {
  id: number;
  type: "Income" | "Expense" | "Saving" | "Investment";
  category?: string;
  description: string;
  amount: number;
  createdAt?: string;
}

const groupAndSortTransactionsByDate = (
  transactions: Transaction[]
): Record<string, { transactions: Transaction[]; amount: number }> => {
  const grouped: Record<string, { transactions: Transaction[]; amount: number }> = {};

  for (const transaction of transactions) {
    if (!transaction.createdAt) continue;
    const date = transaction.createdAt.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    grouped[date].transactions.push(transaction);
    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    grouped[date].amount += amount;
  }

  return grouped;
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
          next: {
            tags: ['transaction-list'],
          },
        });
        const rawTransactions = await res.json();

        const formatted = rawTransactions.map((item: any) => ({
          id: item.id,
          type: item.type,
          category: item.category || undefined,
          description: item.description,
          amount: item.amount,
          createdAt: item.created_at,
        }));

        setTransactions(formatted);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  const groupedData = groupAndSortTransactionsByDate(transactions);

  return (
    <section className="space-y-8">
      {Object.entries(groupedData).map(([date, group]) => (
        <div key={date}>
          <h2 className="text-lg font-bold">
            {date} - Toplam: {group.amount} ₺
          </h2>
          <div className="space-y-2 mt-2">
            {group.transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                {...transaction}
                onRemoved={() => {
                  console.log(`Removed transaction ${transaction.id}`);
                }}
              />
            ))}
          </div>
          <hr className="border-gray-300 dark:border-gray-700 my-4" />
        </div>
      ))}
    </section>
  );
}
