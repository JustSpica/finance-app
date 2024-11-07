import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const button = tv({
  base: 'flex items-center justify-center gap-1 rounded-md px-4 py-2 text-sm transition-colors',
  variants: {
    variant: {
      primary: 'bg-white text-black hover:bg-zinc-200'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>

export function Button({ className, ...props }: ButtonProps) {
  return <button className={twMerge(button(props), className)} {...props} />
}
