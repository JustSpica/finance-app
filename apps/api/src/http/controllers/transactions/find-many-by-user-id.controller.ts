import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { PrismaTransactionsRepository } from '@app/repositories/prisma/prisma-transactions-repository'
import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { FindManyTransactionsByUserIdUseCase } from '@app/use-cases/find-many-transactions-by-user-id'

import { UserDoesNotExist } from '@app/use-cases/errors'

export async function findManyByUserId(req: FastifyRequest, res: FastifyReply) {
  const querySchema = zod.object({
    userId: zod.string()
  })

  const { userId } = querySchema.parse(req.query)

  try {
    const transactionsRepository = new PrismaTransactionsRepository()
    const usersRepository = new PrismaUsersRepository()

    const findManyTransactionsByUserIdUseCase =
      new FindManyTransactionsByUserIdUseCase(
        transactionsRepository,
        usersRepository
      )

    const { transactions } = await findManyTransactionsByUserIdUseCase.handle({
      userId
    })

    return res.status(200).send(transactions)
  } catch (error) {
    if (error instanceof UserDoesNotExist) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }
}
