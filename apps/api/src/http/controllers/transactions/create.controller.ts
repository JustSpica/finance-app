import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { PrismaTransactionsRepository } from '@app/repositories/prisma/prisma-transactions-repository'
import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { CreateTransactionUseCase } from '@app/use-cases/create-transaction'

import { UserDoesNotExist } from '@app/use-cases/errors'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = zod.object({
    categoryId: zod.string().nullish(),
    description: zod.string(),
    userId: zod.string(),
    type: zod.union([zod.literal('input'), zod.literal('output')]),
    value: zod.number()
  })

  const { categoryId, description, type, userId, value } = bodySchema.parse(
    req.body
  )

  try {
    const transactionsRepository = new PrismaTransactionsRepository()
    const usersRepository = new PrismaUsersRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
      transactionsRepository,
      usersRepository
    )

    const { transaction } = await createTransactionUseCase.handle({
      description,
      type,
      userId,
      value,
      categoryId
    })

    return res.status(201).send({ transaction })
  } catch (error) {
    if (error instanceof UserDoesNotExist) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }
}
