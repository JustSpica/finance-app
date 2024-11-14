import {
  WalletMinimal,
  PencilLine,
  CircleArrowUp,
  CircleArrowDown
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Popover, Input } from '@/components'
import { currencyTransform } from '@/utils/currency-transform'

export function Summary() {
  const { control } = useForm()

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="space-y-2 rounded-md border border-zinc-800 px-6 py-4">
        <header className="flex items-center justify-between">
          <span className="font-medium text-zinc-400">Orçamento mensal</span>

          <div className="rounded-md bg-teal-900 p-2 text-teal-200">
            <WalletMinimal size={20} />
          </div>
        </header>
        <div className="flex w-full items-center gap-2">
          <strong className="block text-2xl font-semibold text-white">
            R$ 0,00
          </strong>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button group="icon" variant="outline">
                <PencilLine size={16} />
              </Button>
            </Popover.Trigger>

            <Popover.Content align="start" className="space-y-4">
              <span className="text-xs font-medium text-zinc-400">
                Alterar orçamento
              </span>

              <form className="space-y-3">
                <Controller
                  control={control}
                  name="budget"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Valor"
                      value={value}
                      onChange={(event) => onChange(currencyTransform(event))}
                    />
                  )}
                />

                <Button type="submit" className="w-full">
                  Atualizar
                </Button>
              </form>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>

      <div className="space-y-2 rounded-md border border-zinc-800 px-6 py-4">
        <header className="flex items-center justify-between">
          <span className="font-medium text-zinc-400">Receitas mensais</span>

          <div className="rounded-md bg-green-900 p-2 text-green-200">
            <CircleArrowUp size={20} />
          </div>
        </header>
        <div className="w-full">
          <strong className="block text-2xl font-semibold text-white">
            R$ 0,00
          </strong>
        </div>
      </div>

      <div className="space-y-2 rounded-md border border-zinc-800 px-6 py-4">
        <header className="flex items-center justify-between">
          <span className="font-medium text-zinc-400">Despesas mensais</span>

          <div className="rounded-md bg-red-900 p-2 text-red-200">
            <CircleArrowDown size={20} />
          </div>
        </header>
        <div className="w-full">
          <strong className="block text-2xl font-semibold text-white">
            R$ 0,00
          </strong>
        </div>
      </div>
    </div>
  )
}
