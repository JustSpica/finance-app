import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { UserDoesNotExist } from '@app/use-cases/errors'
import { UpdateUserBudgetUseCase } from '@app/use-cases/update-user-budget'

export async function updateBudget(req: FastifyRequest, res: FastifyReply) {
  const querySchema = zod.object({
    userId: zod.string()
  })

  const bodySchema = zod.object({
    value: zod.number()
  })

  const { value } = bodySchema.parse(req.body)
  const { userId } = querySchema.parse(req.query)

  try {
    const usersRepository = new PrismaUsersRepository()
    const updateUserBudgetUseCase = new UpdateUserBudgetUseCase(usersRepository)

    const { user } = await updateUserBudgetUseCase.handle({
      userId,
      value
    })

    return res.status(200).send({ user })
  } catch (error) {
    if (error instanceof UserDoesNotExist) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }
}
