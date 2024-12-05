import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { twMerge } from 'tailwind-merge'
import { X } from 'lucide-react'

export const Provider = ToastPrimitive.Provider

export const Viewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={twMerge(
      'fixed bottom-0 right-0 z-[100] w-[420px] space-y-2 p-4',
      className
    )}
    {...props}
  />
))
Viewport.displayName = ToastPrimitive.Viewport.displayName

export const Root = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={twMerge(
        'relative rounded-md border border-zinc-800 bg-zinc-950 p-4 transition-all',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-full',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-full',
        className
      )}
      duration={3000}
      {...props}
    />
  )
})
Root.displayName = ToastPrimitive.Root.displayName

export const Close = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={twMerge(
      'absolute right-4 top-4 text-zinc-400 transition-colors',
      'hover:text-zinc-200',
      className
    )}
    toast-close=""
    {...props}
  >
    <X size={18} />
  </ToastPrimitive.Close>
))
Close.displayName = ToastPrimitive.Close.displayName

export const Title = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={twMerge('text-sm font-medium text-white', className)}
    {...props}
  />
))
Title.displayName = ToastPrimitive.Title.displayName

export const Description = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={twMerge('text-sm text-zinc-400', className)}
    {...props}
  />
))
Description.displayName = ToastPrimitive.Description.displayName
