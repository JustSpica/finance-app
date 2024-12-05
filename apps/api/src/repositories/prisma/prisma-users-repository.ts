import { Prisma } from '@prisma/client'

import { prisma } from '@app/lib/prisma-client'

import { UsersRepository } from '../@types/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id }
    })
  }

  async updateBudget(id: string, budget: number) {
    return await prisma.user.update({
      data: {
        budget
      },
      where: {
        id
      }
    })
  }
}
