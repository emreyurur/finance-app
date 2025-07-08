import React, { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={`
        w-full rounded-lg border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-950 px-4 py-2
        text-sm font-medium text-gray-900 dark:text-gray-100
        shadow-sm transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-blue-400 dark:hover:border-blue-400
        disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
        placeholder-gray-400 dark:placeholder-gray-500
        ${props.className ?? ""}
      `}
    />
  );
});

export default Input;