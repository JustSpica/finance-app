import { prisma } from '@app/lib/prisma-client'
import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../@types/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    return user
  }
}
