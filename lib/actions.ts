'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { transactionSchema } from './validation';
import { createClient } from './server';

/**
 * Transaction tipi - Supabase tiplerini export ettiysen oradan import et.
 * Yoksa bunu kullanabilirsin.
 */
export type TransactionInsert = {
  created_at?: string;
  type: 'Income' | 'Expense' | 'Saving' | 'Investment';
  category?: string | null;
  description: string;
  amount: number;
};

export async function purgeTransactionListCache(): Promise<void> {
  revalidateTag('transaction-list');
}

export async function createTransaction(formData: TransactionInsert): Promise<void> {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    const errorMessage = validated.error.errors.map(err => err.message).join(", ");
    throw new Error(`Invalid form data: ${errorMessage}`);
  }

  console.log(formData);
  const supabase = await createClient();
  const { error } = await supabase.from('transactions').insert([formData]);

  if (error) {
    throw new Error(error.message || 'Failed creating the transaction');
  }

  revalidatePath('/dashboard');
}

export async function fetchTransactions(range: string, offset = 0, limit = 10) {
  const supabase = createClient();
  let { data, error } = await (await supabase).rpc('fetch_transactions', {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range
  });

  if (error) throw new Error(error.message || "We can't fetch transactions");
  return data;
}
