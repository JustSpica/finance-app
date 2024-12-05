import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export const Root = SelectPrimitive.Root

export const Value = SelectPrimitive.Value

export const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={twMerge(
      'flex w-full items-center justify-between px-4 py-2 outline-none ring-zinc-800 transition-shadow',
      'rounded-md border border-zinc-800',
      'text-sm text-white data-[placeholder]:text-zinc-400',
      'focus:ring-2',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
Trigger.displayName = SelectPrimitive.Trigger.displayName

export const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(
  (
    { className, children, position = 'popper', sideOffset = 4, ...props },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={twMerge(
          'z-50 rounded-md border border-zinc-800 bg-zinc-950 shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          className
        )}
        sideOffset={sideOffset}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className="h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)] p-2">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
)
Content.displayName = SelectPrimitive.Content.displayName

export const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={twMerge(
      'relative flex w-full cursor-pointer items-center rounded-md p-2 outline-none transition-colors',
      'text-sm text-white',
      'hover:bg-zinc-800',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check size={18} />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
Item.displayName = SelectPrimitive.Item.displayName
