import { JSX, ClassAttributes, LabelHTMLAttributes } from "react";

export default function Label(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLLabelElement> & LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={`block text-gray-700 dark:text-gray-300 ${props.className}`}></label>
}