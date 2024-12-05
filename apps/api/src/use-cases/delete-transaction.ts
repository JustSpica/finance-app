import { TransactionsRepository } from '@app/repositories/@types/transactions-repository'

interface DeleteTransactionUseCaseRequest {
  id: string
}

export class DeleteTransactionUseCase {
  constructor(private transactionRepository: TransactionsRepository) {}

  async handle({ id }: DeleteTransactionUseCaseRequest) {
    const transaction = await this.transactionRepository.delete(id)

    return { transaction }
  }
}
