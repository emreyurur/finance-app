import React from 'react';

type Variant = 'default' | 'outline' | 'ghost' | 'danger';
type Size = 'xs' | 'sm' | 'base' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  default: 'bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-700 dark:hover:bg-gray-200',
  outline: 'border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500',
  ghost: 'rounded-md bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-500',
  danger: 'bg-red-500 text-white dark:bg-red-500 rounded-md hover:bg-red-700 dark:hover:bg-red-700 disabled:opacity-75',
};

const sizes: Record<Size, string> = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  base: 'text-base px-4 py-2',
  lg: 'text-lg px-4 py-2',
};

export default function Button({ variant = 'default', size = 'base', className = '', ...props }: ButtonProps) {
  const variantClass = variants[variant];
  const sizeClass = sizes[size];

  return (
    <button
      {...props}
      className={`${variantClass} ${sizeClass} ${className}`}
    />
  );
}
