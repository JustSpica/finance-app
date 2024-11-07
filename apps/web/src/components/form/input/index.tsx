import React from 'react'
import { twMerge } from 'tailwind-merge'

export const Input = React.forwardRef<
  React.ElementRef<'input'>,
  React.ComponentPropsWithoutRef<'input'>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        'w-full bg-transparent px-4 py-2 text-sm text-white outline-none ring-zinc-800 transition-shadow',
        'rounded-md border border-zinc-800',
        'focus-visible:ring-2',
        'placeholder:text-zinc-400',
        'selection:bg-teal-900 selection:text-teal-200',
        className
      )}
      {...props}
    />
  )
})
Input.displayName = 'Input'
