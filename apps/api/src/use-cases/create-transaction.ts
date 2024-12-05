import { TransactionsRepository } from '@app/repositories/@types/transactions-repository'
import { UsersRepository } from '@app/repositories/@types/users-repository'

import { UserDoesNotExist } from './errors'

interface CreateTransactionUseCaseRequest {
  category?: string | null
  description: string
  type: string
  userId: string
  value: number
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: TransactionsRepository,
    private usersRepository: UsersRepository
  ) {}

  async handle({ userId, ...data }: CreateTransactionUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserDoesNotExist()
    }

    const transaction = await this.transactionRepository.create({
      ...data,
      user_id: userId
    })

    return { transaction }
  }
}
