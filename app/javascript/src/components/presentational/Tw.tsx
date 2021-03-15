import React from 'react'

type TwProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>
type TwButtonProps<T> = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<T>,
  T
>
type TwInputProps<T> = React.DetailedHTMLProps<React.InputHTMLAttributes<T>, T>

export const TwButton: React.FC<TwButtonProps<HTMLButtonElement>> = ({
  className = '',
  ...props
}) => (
  <button
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    {...props}
  />
)

export const TwCard: React.FC<TwProps<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`max-w-sm rounded overflow-hidden shadow-lg ${className}`}
    {...props}
  >
    <div className="px-6 py-4">{children}</div>
  </div>
)

export const TwInput: React.FC<TwInputProps<HTMLInputElement>> = ({
  className = '',
  ...props
}) => (
  <input
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
    {...props}
  />
)
