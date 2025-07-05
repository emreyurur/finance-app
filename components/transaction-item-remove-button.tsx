"use client";

import { useState } from "react";
import { X, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface TransactionItemRemoveButtonProps {
  id: string;
}

export default function TransactionItemRemoveButton({
  id,
}: TransactionItemRemoveButtonProps) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }

    try {
      setLoading(true);

      // Gerçek DELETE isteği
      await fetch(`http://localhost:3001/transactions/${id}`, {
        method: "DELETE",
      });

      // Server Components yeniden render edilir
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`px-2 py-1 rounded text-xs flex items-center justify-center transition
        ${
          !confirmed
            ? "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            : "bg-red-500 text-white hover:bg-red-600"
        }
        ${loading ? "opacity-60 cursor-not-allowed" : ""}
      `}
      onClick={handleClick}
      disabled={loading}
      aria-disabled={loading}
    >
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </button>
  );
}
