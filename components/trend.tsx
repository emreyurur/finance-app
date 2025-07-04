import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { useFormatCurrency } from '@/hooks/use-format-currency'

type TrendProps = {
  type: 'Income' | 'Expense' | 'Investment' | 'Saving'
  amount: number
  prevAmount: number
}

export default function Trend({ type, amount, prevAmount }: TrendProps) {
  const colorClasses: Record<string, string> = {
    Income: 'text-green-700 dark:text-green-300',
    Expense: 'text-red-700 dark:text-red-300',
    Investment: 'text-indigo-700 dark:text-indigo-300',
    Saving: 'text-yellow-700 dark:text-yellow-300',
  }

  const calcPercentageChange = (amount: number, prevAmount: number) => {
    if (!prevAmount || !amount) return 0
    return ((amount - prevAmount) / prevAmount) * 100
  }

  const percentageChange = calcPercentageChange(amount, prevAmount).toFixed(0)
  const formattedAmount = useFormatCurrency(amount)

  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {formattedAmount}
      </div>
      <div className="flex space-x-1 items-center text-sm">
        {Number(percentageChange) <= 0 && (
          <ArrowDownLeft className="text-red-700 dark:text-red-300" />
        )}
        {Number(percentageChange) > 0 && (
          <ArrowUpRight className="text-green-700 dark:text-green-300" />
        )}
        <div>{percentageChange}% vs last period</div>
      </div>
    </div>
  )
}