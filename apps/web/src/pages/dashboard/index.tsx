import { Categories } from './categories'
import { Summary } from './summary'

import { Transactions } from './transactions'
import { CreateTransaction } from './transactions/create-transaction'

export function Dashboard() {
  return (
    <section className="flex h-screen w-full flex-col bg-zinc-950">
      <header className="h-16 w-full border-b-2 border-zinc-800"></header>

      <div className="grid w-full flex-1 grid-cols-[0.7fr_0.3fr] items-start gap-8 p-8">
        <section className="space-y-4">
          <CreateTransaction />
          <Summary />
          <Transactions />
        </section>

        <section>
          <Categories />
        </section>
      </div>
    </section>
  )
}
