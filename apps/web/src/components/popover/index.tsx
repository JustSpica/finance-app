import * as PopoverPrimitive from '@radix-ui/react-popover'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export const Root = PopoverPrimitive.Root

export const Trigger = PopoverPrimitive.Trigger

export const Content = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        className={twMerge(
          'z-50 min-w-80 rounded-md border border-zinc-800 bg-zinc-950 p-2 shadow-md',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=bottom]:slide-in-from-top-2',
          className
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})
Content.displayName = PopoverPrimitive.Content.displayName
