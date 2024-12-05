import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'

import { Button, Input } from '@/components'
import { useToast } from '@/components/toast/use-toast'

import { queryClient } from '@/lib/react-query'

import * as CategoriesService from '@/services/categories'

type CreateCategoryForm = {
  name: string
}

type CategoryFormProps = {
  onOpenChange(open: boolean): void
}

export function CategoryForm({ onOpenChange }: CategoryFormProps) {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register
  } = useForm<CreateCategoryForm>()

  const { toast } = useToast()

  async function createCategory(data: CreateCategoryForm) {
    try {
      await CategoriesService.create(data)

      queryClient.invalidateQueries({ queryKey: ['categories-query'] })

      toast({
        description: 'Categoria criada com sucesso.',
        title: 'Notificação de sucesso!',
        variant: 'success'
      })

      onOpenChange(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)
        if (error.status === 422) {
          return toast({
            description: 'Número máximo de categorias atingido. (5/5)',
            title: 'Notificação de erro',
            variant: 'error'
          })
        }

        return toast({
          description: 'Ocorreu um erro ao cadastra sua categoria.',
          title: 'Notificação de erro',
          variant: 'error'
        })
      }
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(createCategory)}>
      <Input placeholder="Nome da categoria" {...register('name')} />

      <Button loading={isSubmitting} type="submit" className="w-full">
        Adicionar
      </Button>
    </form>
  )
}
