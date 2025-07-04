import { useMemo } from "react"

export const useFormatCurrency = (amount: unknown) => {
  const formatCurrency = (amount: unknown) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(
      typeof amount === "number" || typeof amount === "bigint" ? amount : Number(amount)
    )

  return useMemo(
    () => formatCurrency(amount),
    [amount]
  )
}