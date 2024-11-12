import { TransactionsRepository } from '@app/repositories/@types/transactions-repository'
import { UsersRepository } from '@app/repositories/@types/users-repository'

import { UserDoesNotExist } from './errors'

interface FindManyTransactionsByUserUseCaseRequest {
  userId: string
}

export class FindManyTransactionsByUserUseCase {
  constructor(
    private transactionRepository: TransactionsRepository,
    private usersRepository: UsersRepository
  ) {}

  async handle({ userId }: FindManyTransactionsByUserUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserDoesNotExist()
    }

    const transactions =
      await this.transactionRepository.findManyByUserId(userId)

    return { transactions }
  }
}
