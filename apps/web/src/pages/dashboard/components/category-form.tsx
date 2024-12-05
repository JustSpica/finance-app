import { Button, Input } from '@/components'

export function CategoryForm() {
  return (
    <form className="mt-6 space-y-4">
      <Input placeholder="Nome da categoria" />

      <Button type="submit" className="w-full">
        Adicionar
      </Button>
    </form>
  )
}
