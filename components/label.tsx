import { JSX, ClassAttributes, LabelHTMLAttributes } from "react"

export default function Label(
  props: JSX.IntrinsicAttributes & ClassAttributes<HTMLLabelElement> & LabelHTMLAttributes<HTMLLabelElement>
) {
  return (
    <label
      {...props}
      className={`
        block text-sm font-semibold tracking-wide
        text-gray-700 dark:text-gray-300
        mb-1 select-none cursor-pointer
        ${props.className ?? ""}
      `}
    />
  )
}