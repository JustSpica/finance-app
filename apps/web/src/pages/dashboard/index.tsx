import { Plus } from 'lucide-react'

import { Button, Dialog } from '@/components'

import { TransactionForm, Summary } from './components'

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

              <Button>
                <Plus size={18} />
                Adicionar categoria
              </Button>
            </header>

            <div className="rounded-md border border-zinc-800">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="px-3 py-2 text-left align-middle text-sm font-medium text-zinc-400">
                      Categoria
                    </th>
                    <th className="px-3 py-2 text-left align-middle text-sm font-medium text-zinc-400">
                      Qtd. transações
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b border-zinc-800">
                    <td className="p-3 text-left align-middle text-sm text-white">
                      teste
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="p-3 text-left align-middle text-sm text-white">
                      teste
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="p-3 text-left align-middle text-sm text-white">
                      teste
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="p-3 text-left align-middle text-sm text-white">
                      teste
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="p-3 text-left align-middle text-sm text-white">
                      teste
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
