import React, { forwardRef, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  props,
  ref
) {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        {...props}
        className={`
          w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-950 px-4 py-2 pr-10
          text-sm font-medium text-gray-900 dark:text-gray-100
          shadow-sm transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          hover:border-blue-400 dark:hover:border-blue-400
          disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
          ${props.className ?? ""}
        `}
      />
      {/* Custom arrow */}
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
});

export default Select;