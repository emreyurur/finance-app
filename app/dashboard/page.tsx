import React, { Suspense } from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { sizes, variants } from '@/lib/variant';
import Trend from './components/trend';
import TrendFallback from './components/trend-fallback';
import TransactionList from './components/transaction-list';
import TransactionListFallback from './components/transaction-list-fallback';

export default function Page() {
  return (
    <>
      <section className="mb-8">
        <h1 className="text-4xl font-semibold">Summary</h1>
      </section>

      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Trend type="Income"  />
        <Trend type="Expense"  />
        <Trend type="Investment"  />
        <Trend type="Saving"  />
      </section>

      <section className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Transactions</h2>
        <Link
          href="/dashboard/transaction/add"
          className={`flex items-center space-x-1 ${variants['outline']} ${sizes['sm']}`}
        >
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>

      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
