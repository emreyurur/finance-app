'use client'
import { X, Loader } from 'lucide-react';
import { useState } from "react";

interface TransactionItemRemoveButtonProps {
  id: string;
  onRemoved: () => void;
}

export default function TransactionItemRemoveButton({ id, onRemoved }: TransactionItemRemoveButtonProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [confirmed, setConfirmed] = useState<boolean>(false)

  // Dummy async delete function (actions kaldırıldı)
  const fakeDeleteTransaction = async (id: string) => {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true)
      return
    }
    try {
      setLoading(true)
      await fakeDeleteTransaction(id)
      onRemoved()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      className={`px-2 py-1 rounded text-xs flex items-center justify-center transition
        ${!confirmed ? 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300' : 'bg-red-500 text-white hover:bg-red-600'}
        ${loading ? 'opacity-60 cursor-not-allowed' : ''}
      `}
      onClick={handleClick}
      disabled={loading}
      aria-disabled={loading}
    >
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </button>
  )
}