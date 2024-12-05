import { Plus } from 'lucide-react'

import { Button, Dialog } from '@/components'

import {
  TransactionForm,
  Summary,
  CategoryTable,
  CategoryForm
} from './components'

export function Dashboard() {
  return (
    <section className="flex h-screen w-full flex-col bg-zinc-950">
      <header className="h-16 w-full border-b-2 border-zinc-800"></header>

      <div className="grid w-full flex-1 grid-cols-[0.7fr_0.3fr] items-start gap-8 p-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Estatisticas gerais
            </h2>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button>
                  <Plus size={18} />
                  Adicionar transação
                </Button>
              </Dialog.Trigger>

              <Dialog.Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                <TransactionForm />
              </Dialog.Content>
            </Dialog.Root>
          </div>

          <Summary />
        </section>

        <section>
          <div className="space-y-4">
            <header className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Categorias</h2>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button>
                    <Plus size={18} />
                    Adicionar categoria
                  </Button>
                </Dialog.Trigger>

                <Dialog.Content>
                  <Dialog.Title>Adicionar categoria</Dialog.Title>
                  <CategoryForm />
                </Dialog.Content>
              </Dialog.Root>
            </header>

            <CategoryTable />
          </div>
        </section>
      </div>
    </section>
  )
}
