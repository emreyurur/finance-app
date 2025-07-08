'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
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
}

export async function purgeTransactionListCache(): Promise<void> {
  revalidateTag('transaction-list')
}

export async function createTransaction(formData: TransactionInsert): Promise<void> {

  const validated=transactionSchema.safeParse(formData)
  if(!validated.success){
    throw new Error('Invalid form data')
  }
  
  console.log(formData)
  const { error } = await (await createClient()).from('transactions')
    .insert([formData])

    if (error) {
      throw new Error('Failed creating the transaction')
    }
  
    revalidatePath('/dashboard')
}
