import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { PrismaCategoriesRepository } from '@app/repositories/prisma/prisma-cateogories-repository'

import { DeleteCategoryUseCase } from '@app/use-cases/delete-category'

export async function remove(req: FastifyRequest, res: FastifyReply) {
  const paramsSchema = zod.object({
    id: zod.string()
  })

  const { id } = paramsSchema.parse(req.params)

  try {
    const categoriesRepository = new PrismaCategoriesRepository()

    const deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoriesRepository
    )

    await deleteCategoryUseCase.handle({
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
