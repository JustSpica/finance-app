import React from 'react'
import { Loader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center gap-1 rounded-md px-4 py-2 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50',
  variants: {
    group: {
      icon: 'p-1'
    },
    variant: {
      primary: 'bg-white text-black hover:bg-zinc-200',
      outline: 'text-white ring-1 ring-zinc-800 hover:bg-zinc-800'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export type ButtonProps = {
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>

export const Button = React.forwardRef<React.ElementRef<'button'>, ButtonProps>(
  ({ className, loading, ...props }, ref) => {
    if (loading) {
      return (
        <button
          ref={ref}
          className={twMerge(button(props), className)}
          disabled
          {...props}
        >
          <Loader2 className="animate-spin" size={18} />
          Aguarde...
        </button>
      )
    }

    return (
      <button
        ref={ref}
        className={twMerge(button(props), className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
