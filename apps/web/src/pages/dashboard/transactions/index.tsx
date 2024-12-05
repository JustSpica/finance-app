import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Minus,
  Plus,
  Trash
} from 'lucide-react'

import { Button, DropdownMenu, Table } from '@/components'
import { useToast } from '@/components/toast/use-toast'

import { queryClient } from '@/lib/react-query'

import * as CategoriesService from '@/services/categories'
import * as TransactionsService from '@/services/transactions'

export function Transactions() {
  const [page, setPage] = useState(0)

  const categoriesQuery = useQuery({
    queryKey: ['categories-query'],
    queryFn: CategoriesService.findMany
  })

  const transactionsQuery = useQuery({
    queryKey: ['transactions-query'],
    queryFn: TransactionsService.findMany
  })

  const { toast } = useToast()

  async function deleteTransaction(id: string) {
    try {
      await TransactionsService.remove(id)

      queryClient.invalidateQueries({ queryKey: ['summary-query'] })
      queryClient.invalidateQueries({ queryKey: ['transactions-query'] })

      toast({
        description: 'Transação excluida com sucesso.',
        title: 'Notificação de sucesso!',
        variant: 'success'
      })
    } catch (error) {
      return toast({
        description: 'Ocorreu um erro ao tentar excluir sua transação.',
        title: 'Notificação de erro!',
        variant: 'error'
      })
    }
  }

  const pageLimit = Math.ceil(Number(transactionsQuery.data?.length) / 5)

  function nextPage() {
    setPage((prevState) => {
      if (prevState + 2 > pageLimit) return prevState

      return prevState + 1
    })
  }

  function backPage() {
    setPage((prevState) => {
      if (prevState - 1 < 0) return prevState

      return prevState - 1
    })
  }

  const BRLCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  const transactionsData = transactionsQuery.data?.slice(
    page * 5,
    (page + 1) * 5
  )

  return (
    <div className="w-full space-y-2">
      <Table.Root>
        <Table.Header>
          <Table.Head>Descrição</Table.Head>
          <Table.Head>Categoria</Table.Head>
          <Table.Head>Tipo</Table.Head>
          <Table.Head>Valor R$</Table.Head>
          <Table.Head>Ações</Table.Head>
        </Table.Header>
        <Table.Body>
          {transactionsData?.map((transaction) => {
            const category = categoriesQuery.data?.find((category) => {
              return category.id === transaction.category_id
            })

            return (
              <Table.Row key={transaction.id}>
                <Table.Cell>{transaction.description}</Table.Cell>
                <Table.Cell>{category?.name || '-'}</Table.Cell>
                <Table.Cell className="w-auto">
                  <Tag type={transaction.type} />
                </Table.Cell>
                <Table.Cell className="w-auto">
                  {BRLCurrency.format(transaction.value / 100)}
                </Table.Cell>
                <Table.Cell>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button group="icon" variant="ghost">
                        <Ellipsis size={18} />
                      </Button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content align="start">
                      <DropdownMenu.Item
                        className="flex items-center gap-2"
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        <Trash size={18} />
                        Deletar
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>

      <nav className="float-right flex items-center gap-2 text-white">
        <Button group="icon" variant="ghost" onClick={backPage}>
          <ChevronLeft size={18} />
        </Button>
        <Button className="h-[34px] w-[34px]" group="icon" variant="outline">
          {page + 1}
        </Button>
        <Button group="icon" variant="ghost" onClick={nextPage}>
          <ChevronRight size={18} />
        </Button>
      </nav>
    </div>
  )
}

type TagProps = {
  type: 'input' | 'output'
}

function Tag({ type }: TagProps) {
  return type === 'output' ? (
    <span className="inline-flex items-center justify-start gap-2 rounded-md px-3 py-1 text-red-300 ring-1 ring-zinc-800">
      <Minus size={16} />
      Saída
    </span>
  ) : (
    <span className="inline-flex items-center justify-start gap-2 rounded-md px-3 py-1 text-green-300 ring-1 ring-zinc-800">
      <Plus size={16} />
      Entrada
    </span>
  )
}
