import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { UserDoesNotExist } from '@app/use-cases/errors'
import { makeFindManyTransactionsByUserIdUseCase } from '@app/use-cases/factories'

export async function findManyTransactionsByUserIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const reqSchema = zod.object({
    id: zod.string()
  })

  const { id } = reqSchema.parse(req.params)

  try {
    const findManyTransactionsByUserIdUseCase =
      makeFindManyTransactionsByUserIdUseCase()

    const { transactions } = await findManyTransactionsByUserIdUseCase.handle({
      id
    })

    return res.status(200).send(transactions)
  } catch (error) {
    if (error instanceof UserDoesNotExist) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }
}
