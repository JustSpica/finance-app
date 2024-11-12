import { PrismaTransactionsRepository } from '@app/repositories/prisma/prisma-transactions-repository'
import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { FindManyTransactionsByUserUseCase } from '../find-many-transactions-by-user'

export function makeFindManyTransactionsByUserUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const usersRepository = new PrismaUsersRepository()

  const findManyTransactionsByUserUseCase =
    new FindManyTransactionsByUserUseCase(
      transactionsRepository,
      usersRepository
    )

  return findManyTransactionsByUserUseCase
}
