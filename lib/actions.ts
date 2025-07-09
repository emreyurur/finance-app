'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { transactionSchema } from './validation';
import { createClient } from './server';

/**
 * Transaction tipi - Supabase tiplerini export ettiysen oradan import et.
 * Yoksa bunu kullanabilirsin.
 */
export interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  type: 'Income' | 'Expense' | 'Saving' | 'Investment';
  category?: string | null;
  description: string;
}

export async function purgeTransactionListCache(): Promise<void> {
  revalidateTag('transaction-list');
}

export async function createTransaction(formData: Transaction): Promise<void> {
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

export async function fetchTransactions(
  range: string,
  offset: number = 0,
  limit: number = 10
): Promise<Transaction[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('fetch_transactions', {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });

  if (error) {
    console.error('❌ Supabase RPC error:', error.message);
    throw new Error(error.message || "We can't fetch transactions");
  }

  if (!Array.isArray(data)) {
    console.error('❌ Unexpected response:', data);
    throw new Error("Invalid transaction data format");
  }

  return data as Transaction[];
}

export async function deleteTransaction(transactionId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', transactionId);

  if (error) {
    throw new Error(error.message || 'Failed deleting the transaction');
  }

  revalidatePath('/dashboard');
}

export async function updateTransaction(
  id: string,
  formData: Partial<Omit<Transaction, 'id'>>
): Promise<void> {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    const errorMessage = validated.error.errors.map(err => err.message).join(", ");
    throw new Error(`Invalid data: ${errorMessage}`);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('transactions')
    .update(formData)
    .eq('id', id);

  if (error) {
    throw new Error(error.message || 'Failed updating the transaction');
  }

  revalidatePath('/dashboard');
}
