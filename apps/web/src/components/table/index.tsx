import React from 'react'

import { twMerge } from 'tailwind-merge'

export type TableGenericChildren = {
  children: React.ReactNode
}

export function Root({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div className="w-full overflow-hidden rounded-md border border-zinc-800">
      <table className={twMerge('w-full text-sm', className)} {...props} />
    </div>
  )
}

export function Header({ children, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead {...props}>
      <tr className="border-b-2 border-zinc-800">{children}</tr>
    </thead>
  )
}

export function Head({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      className={twMerge(
        'px-3 py-2 text-left align-middle text-sm font-medium text-zinc-400',
        className
      )}
      {...props}
    />
  )
}

export function Body({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      className={twMerge('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

export function Row({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr className={twMerge('border-b border-zinc-800', className)} {...props} />
  )
}

export function Cell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      className={twMerge(
        'p-3 text-left align-middle text-sm text-white',
        className
      )}
      {...props}
    />
  )
}
