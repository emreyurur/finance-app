import React from 'react';
import Trend from '@/components/trend';

export default async function TrendServer({ type }: { type: string }) {
  if (
    typeof type !== 'string' ||
    !['Income', 'Expense', 'Investment', 'Saving'].includes(type)
  ) {
    throw new Error('Invalid type');
  }

  const response = await fetch(`${process.env.API_URL}/trends/${type}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    // Eğer API 404 veya başka hata dönerse, hata fırlat
    throw new Error(`Failed to fetch trend: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  const { amount, prevAmount } = data;

  return (
    <Trend
      type={type as 'Income' | 'Expense' | 'Investment' | 'Saving'}
      amount={amount}
      prevAmount={prevAmount}
    />
  );
}
