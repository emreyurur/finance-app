import React from 'react'
import Trend from '@/components/trend'
import { type } from 'os'

export default async function trend() {
    const response=await fetch('http://localhost:3001/trends/${type}')
    const {amount,prevAmount}=await response.json()
    if (typeof type !== 'string' || !['Income', 'Expense', 'Investment', 'Saving'].includes(type)) {
      throw new Error('Invalid type');
    }
    return (
      <Trend type={type} amount={amount} prevAmount={prevAmount} />
    )
    }