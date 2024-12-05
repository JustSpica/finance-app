import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { PrismaCategoriesRepository } from '@app/repositories/prisma/prisma-cateogories-repository'
import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { FindManyCategoriesByUserIdUseCase } from '@app/use-cases/find-many-categories-by-user-id'

import { UserDoesNotExist } from '@app/use-cases/errors'

export async function findManyByUserId(req: FastifyRequest, res: FastifyReply) {
  const querySchema = zod.object({
    userId: zod.string()
  })

  const { userId } = querySchema.parse(req.query)

  try {
    const categoriesRepository = new PrismaCategoriesRepository()
    const usersRepository = new PrismaUsersRepository()

    const findManyCategoriesByUserIdUseCase =
      new FindManyCategoriesByUserIdUseCase(
        categoriesRepository,
        usersRepository
      )

    const { categories } = await findManyCategoriesByUserIdUseCase.handle({
      userId
    })

    return res.status(200).send(categories)
  } catch (error) {
    if (error instanceof UserDoesNotExist) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }
}
