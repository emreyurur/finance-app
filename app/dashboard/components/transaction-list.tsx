'use client';

import Button from "@/components/button";
import Separator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { fetchTransactions } from "@/lib/actions";
import { groupAndSumTransactionsByDate } from "@/lib/utils";
import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  type: "Income" | "Expense" | "Saving" | "Investment";
  description: string;
  category?: string | null;
}

interface TransactionListProps {
  range: string;
  initialTransactions: Transaction[];
}

export default function TransactionList({ range, initialTransactions }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [offset, setOffset] = useState<number>(initialTransactions.length);

  const grouped = groupAndSumTransactionsByDate(transactions);

  const handleClick = async () => {
    const nextTransactions = await fetchTransactions(range, offset, 10);
    setOffset(prevValue => prevValue + 10);
    setTransactions(prevTransactions => [
      ...prevTransactions,
      ...nextTransactions
    ]);
  };

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} amount={amount} />
          <Separator />
          <section className="space-y-4">
            {transactions.map(transaction => (
              <div key={transaction.id}>
                <TransactionItem description={""} onRemoved={function (): void {
                  throw new Error("Function not implemented.");
                } } {...transaction} />
              </div>
            ))}
          </section>
        </div>
      ))}
      <div className="flex justify-center">
        <Button variant="ghost" onClick={handleClick}>Load More</Button>
      </div>
    </div>
  );
}
