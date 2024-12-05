import { Prisma } from '@prisma/client'

import { prisma } from '@app/lib/prisma-client'

import { CategoriesRepository } from '../@types/categories-repository'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryUncheckedCreateInput) {
    return await prisma.category.create({
      data
    })
  }

  async delete(id: string) {
    return await prisma.category.delete({
      where: {
        id
      }
    })
  }

  async findManyByUserId(userId: string) {
    return await prisma.category.findMany({
      where: {
        user_id: userId
      }
    })
  }
}
