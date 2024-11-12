import { PrismaTransactionsRepository } from '@app/repositories/prisma/prisma-transactions-repository'
import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { CreateTransactionUseCase } from '../create-transaction'

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const usersRepository = new PrismaUsersRepository()

  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionsRepository,
    usersRepository
  )

  return createTransactionUseCase
}
