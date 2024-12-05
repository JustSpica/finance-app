import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { PrismaTransactionsRepository } from '@app/repositories/prisma/prisma-transactions-repository'

import { DeleteTransactionUseCase } from '@app/use-cases/delete-transaction'

export async function remove(req: FastifyRequest, res: FastifyReply) {
  const paramsSchema = zod.object({
    id: zod.string()
  })

  const { id } = paramsSchema.parse(req.params)

  try {
    const transactionsRepository = new PrismaTransactionsRepository()

    const deleteTransactionUseCase = new DeleteTransactionUseCase(
      transactionsRepository
    )

    await deleteTransactionUseCase.handle({
      id
    })

    return res.status(204).send()
  } catch (error) {
    if (error) {
      throw error
    }

    throw error
  }
}
