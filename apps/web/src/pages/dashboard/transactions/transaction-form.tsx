import * as RadioPrimitive from '@radix-ui/react-radio-group'
import { useQuery } from '@tanstack/react-query'
import { CircleArrowUp, CircleArrowDown } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { Button, Input, Select } from '@/components'
import { useToast } from '@/components/toast/use-toast'

import { queryClient } from '@/lib/react-query'

import * as CategoriesService from '@/services/categories'
import * as TransactionsService from '@/services/transactions'

import { currency } from '@/utils/currency-mask'

type NewTransactionForm = {
  categoryId?: string | null
  description: string
  type: 'input' | 'output'
  value: string
}

type TransactionFormProps = {
  onOpenChange(open: boolean): void
}

export function TransactionForm({ onOpenChange }: TransactionFormProps) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    register
  } = useForm<NewTransactionForm>()

  const categoriesQuery = useQuery({
    queryKey: ['categories-query'],
    queryFn: CategoriesService.findMany
  })

  const { toast } = useToast()

  async function createTransaction(formData: NewTransactionForm) {
    try {
      const data = {
        ...formData,
        categoryId: formData.categoryId || null,
        value: Number(currency.unmask(formData.value))
      }

      await TransactionsService.create(data)

      queryClient.invalidateQueries({ queryKey: ['summary-query'] })
      queryClient.invalidateQueries({ queryKey: ['transactions-query'] })

      toast({
        description: 'Transação criada com sucesso.',
        title: 'Notificação de sucesso!',
        variant: 'success'
      })

      onOpenChange(false)
    } catch (error) {
      console.error(error)

      toast({
        description: 'Ocorreu um erro ao criar sua transação.',
        title: 'Notificação de erro',
        variant: 'error'
      })
    }
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
            onChange={(event) => onChange(currency.mask(event))}
          />
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <Select.Root onValueChange={field.onChange}>
            <Select.Trigger>
              <Select.Value placeholder="Selecione uma categoria" />
            </Select.Trigger>

            <Select.Content>
              {!categoriesQuery.data || categoriesQuery.data.length === 0 ? (
                <span className="block w-full p-2 text-sm italic text-zinc-400">
                  Não existem categorias cadastradas
                </span>
              ) : (
                categoriesQuery.data.map((category) => (
                  <Select.Item key={category.id} value={category.id}>
                    {category.name}
                  </Select.Item>
                ))
              )}
            </Select.Content>
          </Select.Root>
        )}
      />

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

      <Button loading={isSubmitting} type="submit" className="w-full">
        Adicionar
      </Button>
    </form>
  )
}
