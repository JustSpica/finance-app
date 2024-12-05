import { useState } from 'react'
import { Plus } from 'lucide-react'

import { Button, Dialog } from '@/components'

import { CategoryForm } from './category-form'
import { CategoryTable } from './category-table'

export function Categories() {
  const [createCategoryDialog, setCreateCategoryDialog] = useState(false)

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Categorias</h2>

        <Dialog.Root
          open={createCategoryDialog}
          onOpenChange={setCreateCategoryDialog}
        >
          <Dialog.Trigger asChild>
            <Button>
              <Plus size={18} />
              Adicionar categoria
            </Button>
          </Dialog.Trigger>

          <Dialog.Content>
            <Dialog.Title>Adicionar categoria</Dialog.Title>
            <CategoryForm onOpenChange={setCreateCategoryDialog} />
          </Dialog.Content>
        </Dialog.Root>
      </header>

      <CategoryTable />
    </div>
  )
}
