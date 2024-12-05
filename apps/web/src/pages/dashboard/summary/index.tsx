import {
  CircleArrowDown,
  CircleArrowUp,
  PencilLine,
  WalletMinimal
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

import { Button, Popover, Input } from '@/components'
import { useToast } from '@/components/toast/use-toast'

import { queryClient } from '@/lib/react-query'

import * as UsersService from '@/services/users'

import { currency } from '@/utils/currency-mask'
import { useEffect } from 'react'

type UpdateBudgetForm = {
  value: string
}

export function Summary() {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit
  } = useForm<UpdateBudgetForm>()

  const { toast } = useToast()

  const summaryQuery = useQuery({
    queryKey: ['summary-query'],
    queryFn: UsersService.findSummary
  })

  const BRLCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  async function updateBudget(data: UpdateBudgetForm) {
    const currencyValue = currency.unmask(data.value)

    if (!currencyValue) return

    try {
      await UsersService.updateBudget(currencyValue)

      queryClient.invalidateQueries({ queryKey: ['summary-query'] })

      toast({
        description: 'Orçamento atualizado.',
        title: 'Notificação de sucesso!',
        variant: 'success'
      })
    } catch (error) {
      toast({
        description: 'Ocorreu um erro ao atualizar o orçamento.',
        title: 'Notificação de erro',
        variant: 'error'
      })
    }
  }

  useEffect(() => {
    if (summaryQuery.data) {
      if (summaryQuery.data.limit_alert) {
        toast({
          description:
            'Seus gastos ultrapassaram 70% do seu orçamento mensal definido.',
          title: 'Notificação de alerta!',
          variant: 'warn'
        })
      }

      if (summaryQuery.data.surplus_alert) {
        toast({
          description: 'Seus gastos excederam o orçamento mensal definido.',
          title: 'Notificação de alerta!',
          variant: 'warn'
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryQuery.data])

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
            {BRLCurrency.format(Number(summaryQuery.data?.budget) / 100)}
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

              <form className="space-y-3" onSubmit={handleSubmit(updateBudget)}>
                <Controller
                  control={control}
                  name="value"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Valor"
                      value={value}
                      onChange={(event) => onChange(currency.mask(event))}
                    />
                  )}
                />

                <Button loading={isSubmitting} type="submit" className="w-full">
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
            {BRLCurrency.format(Number(summaryQuery.data?.input) / 100)}
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
            {BRLCurrency.format(Number(summaryQuery.data?.output) / 100)}
          </strong>
        </div>
      </div>
    </div>
  )
}
