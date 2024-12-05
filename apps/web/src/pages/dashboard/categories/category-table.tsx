import { useQuery } from '@tanstack/react-query'
import { Ellipsis, Trash } from 'lucide-react'

import { Button, DropdownMenu, Table } from '@/components'
import { useToast } from '@/components/toast/use-toast'

import { queryClient } from '@/lib/react-query'

import * as CategoriesService from '@/services/categories'

export function CategoryTable() {
  const categoriesQuery = useQuery({
    queryKey: ['categories-query'],
    queryFn: CategoriesService.findMany
  })

  const { toast } = useToast()

  async function deleteCategory(id: string) {
    try {
      await CategoriesService.remove(id)

      queryClient.invalidateQueries({ queryKey: ['categories-query'] })

      toast({
        description: 'Categoria excluida com sucesso.',
        title: 'Notificação de sucesso!',
        variant: 'success'
      })
    } catch (error) {
      return toast({
        description: 'Ocorreu um erro ao tentar excluir essa categoria.',
        title: 'Notificação de erro!',
        variant: 'error'
      })
    }
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Head>
          Categorias {categoriesQuery.data?.length || 0}/5
        </Table.Head>
        <Table.Head>Ações</Table.Head>
      </Table.Header>
      <Table.Body>
        {categoriesQuery.data?.map((category) => (
          <Table.Row key={category.id}>
            <Table.Cell>{category.name}</Table.Cell>
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
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash size={18} />
                    Deletar
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
