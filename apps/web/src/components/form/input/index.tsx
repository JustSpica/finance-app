import React from "react";
import { twMerge } from "tailwind-merge";

export const Input = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithoutRef<"input">
>((props, ref) => {
  return (
    <input
      className={twMerge(
        "px-3 py-2 bg-transparent border border-zinc-500 rounded-md",
        "text-sm text-white placeholder:text-zinc-500"
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
