import React from 'react'
import PageHeader from '../../components/page-header'
import Trend from '@/components/trend'
import TransactionItem from '@/components/transaction-item'
import Separator from '@/components/seperator'
import TransactionSummaryItem from '@/components/transaction-summary-item'
import Skeleton from '@/components/skeleton'

export default function index() {
  return (
    <main className="space-y-8">
        <h1 className='text-4xl mt-8'>Playground</h1>
    <div>
        <h2 className='mb-4 text-lg font-mono'>ComponentName</h2>
        <hr className='mb-4 border-gray-200 dark:border-gray-800' />
        <div><PageHeader/></div>
        <div>
          <h2 className='mb-4 text-lg font-mono'>Trend</h2>
          <hr className='mb-4 border-gray-200 dark:border-gray-800' />
          <div className='flex space-x-4'>
            <Trend type="Income" amount={1000} prevAmount={800} />
            <Trend type="Expense" amount={500} prevAmount={600} />
            <Trend type="Investment" amount={1200} prevAmount={1000} />
            <Trend type="Saving" amount={700} prevAmount={500} />
          </div>
          <div>
        <h2 className="mb-4 text-lg font-mono">TransactionItem</h2>
        <Separator />
        <div className="space-y-4">
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29} />
          <TransactionItem type="Saving" description="For children" amount={500} />
          <TransactionItem type="Investment" description="In Microsoft" amount={9000} />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">TransactionSummaryItem + TransactionItem</h2>
        <Separator />
        <div className="space-y-4">
          <TransactionSummaryItem date="2024-05-01" amount={3500} />
          <Separator />
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29} />
          <TransactionItem type="Saving" description="For children" amount={500} />
          <TransactionItem type="Investment" description="In Microsoft" amount={9000} />
        </div>
      </div>
        </div>
    </div>
    <div>
        <h2 className="mb-4 text-lg font-mono">Loading Skeleton</h2>
        <Separator />
        <div className="space-y-8">
          <div className="flex space-x-4">
            <Skeleton className={''} />
            <Skeleton className={''} />
            <Skeleton className={''} />
          </div>

          <div className="space-y-4">
            <Skeleton className={''} />
            <Skeleton className={''} />
            <Skeleton className={''} />
          </div>
        </div>
      </div>
    </main>
  )
}