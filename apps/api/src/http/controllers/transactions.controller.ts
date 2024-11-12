import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { UserDoesNotExist } from '@app/use-cases/errors'
import {
  makeCreateTransactionUseCase,
  makeFindManyTransactionsByUserUseCase
} from '@app/use-cases/factories'

export class TransactionsController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createTransactionSchema = zod.object({
      description: zod.string(),
      userId: zod.string(),
      type: zod.union([zod.literal('input'), zod.literal('output')]),
      value: zod.number()
    })

    const { description, type, userId, value } = createTransactionSchema.parse(
      req.body
    )

    try {
      const createTransactionUseCase = makeCreateTransactionUseCase()

      const { transaction } = await createTransactionUseCase.handle({
        description,
        type,
        userId,
        value
      })

      return reply.status(201).send(transaction)
    } catch (error) {
      if (error instanceof UserDoesNotExist) {
        return reply.status(400).send({ message: error.message })
      }

      throw error
    }
  }

  async findManyByUserId(req: FastifyRequest, reply: FastifyReply) {
    const findManyByUserIdSchema = zod.object({
      userId: zod.string()
    })

    const { userId } = findManyByUserIdSchema.parse(req.query)

    try {
      const findManyTransactionsByUserUseCase =
        makeFindManyTransactionsByUserUseCase()

      const { transactions } = await findManyTransactionsByUserUseCase.handle({
        userId
      })

      return reply.status(200).send(transactions)
    } catch (error) {
      if (error instanceof UserDoesNotExist) {
        return reply.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}
