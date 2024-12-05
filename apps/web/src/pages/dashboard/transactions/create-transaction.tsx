import { useState } from 'react'
import { Plus } from 'lucide-react'

import { Button, Dialog } from '@/components'

import { TransactionForm } from './transaction-form'

export function CreateTransaction() {
  const [createTransactionDialog, setCreateTransactionDialog] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-white">Estatisticas gerais</h2>

      <Dialog.Root
        open={createTransactionDialog}
        onOpenChange={setCreateTransactionDialog}
      >
        <Dialog.Trigger asChild>
          <Button>
            <Plus size={18} />
            Adicionar transação
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Nova transação</Dialog.Title>
          <TransactionForm onOpenChange={setCreateTransactionDialog} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
