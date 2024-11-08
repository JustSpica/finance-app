import { Button } from '@app/components'
import {
  CircleArrowUp,
  CircleArrowDown,
  Plus,
  WalletMinimal,
  MousePointerClick
} from 'lucide-react'

export function Dashboard() {
  return (
    <section className="flex h-screen w-full flex-col bg-zinc-950">
      <header className="h-16 w-full border-b-2 border-zinc-800"></header>

      <div className="grid w-full flex-1 grid-cols-[0.7fr_0.3fr] items-start p-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">
              Estatisticas gerais
            </h1>
            <Button>
              <Plus size={18} />
              Adicionar transação
            </Button>
          </div>

          <div className="grid w-full grid-cols-3 gap-4">
            <div className="space-y-2 rounded-md border border-zinc-800 px-6 py-4">
              <header className="flex items-center justify-between">
                <span className="font-medium text-zinc-400">
                  Orçamento mensal
                </span>
                <div className="rounded-md bg-teal-900 p-2 text-teal-200">
                  <WalletMinimal size={20} />
                </div>
              </header>

              <div className="flex w-full items-center justify-between">
                <strong className="block text-2xl font-semibold text-white">
                  R$ 10.000,00
                </strong>

                <MousePointerClick className="text-white" size={18} />
              </div>
            </div>

            <div className="space-y-2 rounded-md border border-zinc-800 px-6 py-4">
              <header className="flex items-center justify-between">
                <span className="font-medium text-zinc-400">
                  Receitas mensais
                </span>
                <div className="rounded-md bg-green-900 p-2 text-green-200">
                  <CircleArrowUp size={20} />
                </div>
              </header>
              <strong className="block text-2xl font-semibold text-white">
                R$ 10.000,00
              </strong>
            </div>

            <div className="space-y-2 rounded-md border border-zinc-800 px-6 py-4">
              <header className="flex items-center justify-between">
                <span className="font-medium text-zinc-400">
                  Gastos mensais
                </span>
                <div className="rounded-md bg-red-900 p-2 text-red-200">
                  <CircleArrowDown size={20} />
                </div>
              </header>
              <strong className="block text-2xl font-semibold text-white">
                R$ 10.000,00
              </strong>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
