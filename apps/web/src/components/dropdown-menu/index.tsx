import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export const Root = DropdownMenuPrimitive.Root

export const Trigger = DropdownMenuPrimitive.Trigger

export const Content = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        className={twMerge(
          'z-50 min-w-32 rounded-md border border-zinc-800 bg-zinc-950 p-2 shadow-md',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2',
          className
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
})
Content.displayName = DropdownMenuPrimitive.Content.displayName

export const Item = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={twMerge(
      'cursor-pointer rounded-md p-2 text-sm text-white outline-none transition-colors',
      'hover:bg-zinc-800',
      className
    )}
    {...props}
  />
))
Item.displayName = DropdownMenuPrimitive.Item.displayName

export const Label = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Label
      className={twMerge('text-xs font-medium text-zinc-400', className)}
      ref={ref}
      {...props}
    />
  )
})
Label.displayName = DropdownMenuPrimitive.Label.displayName
