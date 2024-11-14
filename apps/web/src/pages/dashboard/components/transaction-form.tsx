import * as RadioPrimitive from '@radix-ui/react-radio-group'
import { CircleArrowUp, CircleArrowDown, ChevronsUpDown } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { Button, DropdownMenu, Input } from '@/components'
import { currencyTransform } from '@/utils/currency-transform'

type NewTransactionData = {
  description: string
  type: 'input' | 'output'
  value: string
}

export function TransactionForm() {
  const { control, handleSubmit, register } = useForm<NewTransactionData>()

  async function createTransaction(data: NewTransactionData) {
    console.log(data)
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(createTransaction)}>
      <Input placeholder="Descrição" {...register('description')} />

      <Controller
        control={control}
        name="value"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Valor"
            value={value}
            onChange={(event) => onChange(currencyTransform(event))}
          />
        )}
      />

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            className="w-full justify-between text-zinc-400 hover:text-white"
            variant="outline"
          >
            Selecione uma categoria...
            <ChevronsUpDown size={18} />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="min-w-[--radix-dropdown-menu-trigger-width]">
          <span className="block">teste</span>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Controller
        control={control}
        name="type"
        defaultValue="input"
        render={({ field }) => (
          <RadioPrimitive.RadioGroup
            className="grid grid-cols-2 gap-4"
            onValueChange={field.onChange}
            defaultValue="input"
          >
            <RadioPrimitive.Item
              className={twMerge(
                'flex items-center justify-center gap-2 bg-zinc-950 p-4 ring-zinc-800 transition-all',
                'text-sm text-zinc-400',
                'rounded-md border border-zinc-800',
                'focus-visible:ring-2',
                'hover:text-white',
                'data-[state=checked]:bg-zinc-800 data-[state=checked]:text-white'
              )}
              id="r1"
              value="input"
            >
              <CircleArrowUp size={18} />
              Entrada
            </RadioPrimitive.Item>

            <RadioPrimitive.Item
              className={twMerge(
                'flex items-center justify-center gap-2 bg-zinc-950 p-4 ring-zinc-800 transition-all',
                'text-sm text-zinc-400',
                'rounded-md border border-zinc-800',
                'focus-visible:ring-2',
                'hover:text-white',
                'data-[state=checked]:bg-zinc-800 data-[state=checked]:text-white'
              )}
              id="r2"
              value="output"
            >
              <CircleArrowDown size={18} />
              Saída
            </RadioPrimitive.Item>
          </RadioPrimitive.RadioGroup>
        )}
      />

      <Button type="submit" className="w-full">
        Adicionar
      </Button>
    </form>
  )
}
