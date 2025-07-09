"use client";

import { useFormatCurrency } from "@/hooks/use-format-currency";
import { HandCoins, Wallet, Landmark, PiggyBank, LucideIcon,Pencil } from 'lucide-react';
import TransactionItemRemoveButton from "./transaction-item-remove-button";
import {sizes,variants} from "@/lib/variant"
import Link from "next/link";

export type TransactionType = "Income" | "Expense" | "Saving" | "Investment";

export type TransactionItemProps = {
  id: string;
  type: TransactionType;
  category?: string | null;
  description: string;
  amount: number;
  onRemoved: () => void;
};

type TypeMap = Record<TransactionType, {
  icon: LucideIcon;
  colors: string;
}>;

export default function TransactionItem({
  id,
  type,
  category,
  description,
  amount,
  onRemoved
}: TransactionItemProps) {

  const typesMap: TypeMap = {
    Income: {
      icon: HandCoins,
      colors: "text-green-500 dark:text-green-400",
    },
    Expense: {
      icon: Wallet,
      colors: "text-red-500 dark:text-red-400",
    },
    Saving: {
      icon: PiggyBank,
      colors: "text-indigo-500 dark:text-indigo-400",
    },
    Investment: {
      icon: Landmark,
      colors: "text-yellow-500 dark:text-yellow-400",
    },
  };

  // Fallback mekanizması - bilinmeyen type durumuna karşı önlem
  const typeInfo = typesMap[type] || {
    icon: Wallet,
    colors: "text-gray-400 dark:text-gray-500",
  };

  const IconComponent = typeInfo.icon;
  const colors = typeInfo.colors;
  const formattedAmount = useFormatCurrency(amount);

  return (
    <div className="w-full flex items-center">
      <div className="flex items-center mr-4 grow">
        <IconComponent className={`${colors} mr-2 w-4 h-4 hidden sm:block`} />
        <span>{description}</span>
      </div>

      <div className="min-w-[150px] items-center hidden md:flex">
        {category && (
          <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">
            {category}
          </div>
        )}
      </div>

      <div className="min-w-[70px] text-right">
        {formattedAmount}
      </div>

      <div className="min-w-[100px] flex justify-end">
      <Link href={`/dashboard/transaction/${id}/edit`} className={`${variants['ghost']} ${sizes['xs']}`}>
          <Pencil className="w-4 h-4"/>
      </Link>
        <TransactionItemRemoveButton id={id} onRemoved={onRemoved} />
      </div>
    </div>
  );
}
