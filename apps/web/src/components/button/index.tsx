import { tv, type VariantProps } from "tailwind-variants";
import { twMerge as merge } from "tailwind-merge";

const button = tv({
  base: "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors font-medium justify-center",
  variants: {
    variant: {
      primary: "bg-white text-black hover:bg-zinc-200",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export function Button({ className, ...props }: ButtonProps) {
  return <button className={merge(button(props), className)} {...props} />;
}
