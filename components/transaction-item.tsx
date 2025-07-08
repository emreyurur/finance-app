import { useFormatCurrency } from "@/hooks/use-format-currency";
import {
  HandCoins,
  Wallet,
  Landmark,
  PiggyBank,
  Pencil,
} from "lucide-react";
import TransactionItemRemoveButton from "./transaction-item-remove-button";
import Link from "next/link";

type TransactionItemProps = {
  id: string | number;
  type: "Income" | "Expense" | "Saving" | "Investment";
  category?: string;
  description: string;
  amount: number;
  onRemoved: () => void;
};

export default function TransactionItem({
  id,
  type,
  category,
  description,
  amount,
  onRemoved,
}: TransactionItemProps) {
  const typesMap = {
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

  const fallback = {
    icon: Wallet,
    colors: "text-gray-400 dark:text-gray-500",
  };

  const typeInfo = typesMap[type] || fallback;

  if (!typesMap[type]) {
    console.warn(`⚠️ Unknown transaction type: ${type}`);
  }

  const IconComponent = typeInfo.icon;
  const colors = typeInfo.colors;
  const formattedAmount = useFormatCurrency(amount);

  return (
    <div className="w-full flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center mr-4 grow">
        <IconComponent className={`${colors} mr-2 w-5 h-5`} />
        <span className="font-medium">{description}</span>
      </div>

      <div className="min-w-[150px] items-center hidden md:flex">
        {category && (
          <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">
            {category}
          </div>
        )}
      </div>

      <div className="min-w-[70px] text-right font-semibold">
        {formattedAmount}
      </div>

      <div className="min-w-[100px] flex justify-end space-x-2">
        <Link
          href={`/dashboard/transaction/${id}/edit`}
          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <Pencil className="w-4 h-4" />
        </Link>
        <TransactionItemRemoveButton id={String(id)} />
      </div>
    </div>
  );
}
