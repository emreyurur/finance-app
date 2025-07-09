"use client";

import { useEffect, useRef, useState } from "react";
import { deleteTransaction } from "@/lib/actions";
import Button from "./button";
import { X, Loader } from "lucide-react";

type TransactionItemRemoveButtonProps = {
  id: string;
  onRemoved: () => void;
};

export default function TransactionItemRemoveButton({
  id,
  onRemoved,
}: TransactionItemRemoveButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }

    try {
      setLoading(true);
      await deleteTransaction(id);
      onRemoved();
    } finally {
      setLoading(false);
    }
  };

  // Sayfada boş bir yere tıklanırsa onayı sıfırla
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        confirmed &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setConfirmed(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [confirmed]);

  return (
    <Button
      ref={buttonRef}
      size="xs"
      variant={!confirmed ? "ghost" : "danger"}
      onClick={handleClick}
      aria-disabled={loading}
    >
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
}
