import { PrismaTransactionsRepository } from '@app/repositories/prisma/prisma-transactions-repository'
import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { FindManyTransactionsByUserIdUseCase } from '../find-many-transactions-by-user-id'

export function makeFindManyTransactionsByUserIdUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const usersRepository = new PrismaUsersRepository()

  const findManyTransactionsByUserIdUseCase =
    new FindManyTransactionsByUserIdUseCase(
      transactionsRepository,
      usersRepository
    )

  return findManyTransactionsByUserIdUseCase
}
