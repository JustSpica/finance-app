import { Prisma } from '@prisma/client'

import { prisma } from '@app/lib/prisma-client'

import { TransactionsRepository } from '../@types/transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    return await prisma.transaction.create({
      data
    })
  }

  async delete(id: string) {
    return await prisma.transaction.delete({
      where: {
        id
      }
    })
  }

  async findManyByUserId(userId: string) {
    return await prisma.transaction.findMany({
      where: {
        user_id: userId
      }
    })
  }
}
