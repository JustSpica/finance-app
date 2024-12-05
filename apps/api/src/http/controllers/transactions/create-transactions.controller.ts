import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { UserDoesNotExist } from '@app/use-cases/errors'
import { makeCreateTransactionUseCase } from '@app/use-cases/factories'

export async function createTransactionController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const reqSchema = zod.object({
    category: zod.string().nullish(),
    description: zod.string(),
    userId: zod.string(),
    type: zod.union([zod.literal('input'), zod.literal('output')]),
    value: zod.number()
  })

  const data = reqSchema.parse(req.body)

  try {
    const createTransactionUseCase = makeCreateTransactionUseCase()

    const { transaction } = await createTransactionUseCase.handle(data)

    return res.status(201).send(transaction)
  } catch (error) {
    if (error instanceof UserDoesNotExist) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }
}
