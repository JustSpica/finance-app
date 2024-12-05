import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { PrismaCategoriesRepository } from '@app/repositories/prisma/prisma-cateogories-repository'
import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { CreateCategoryUseCase } from '@app/use-cases/create-category'
import { TooManyCategories, UserDoesNotExist } from '@app/use-cases/errors'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = zod.object({
    name: zod.string(),
    userId: zod.string()
  })

  const { name, userId } = bodySchema.parse(req.body)

  try {
    const categoriesRepository = new PrismaCategoriesRepository()
    const usersRepository = new PrismaUsersRepository()

    const createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepository,
      usersRepository
    )

    const { category } = await createCategoryUseCase.handle({
      name,
      userId
    })

    return res.status(201).send({ category })
  } catch (error) {
    if (error instanceof TooManyCategories) {
      return res.status(422).send({ message: error.message })
    }

    if (error instanceof UserDoesNotExist) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }
}
