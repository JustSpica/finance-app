import { Prisma, Transaction } from '@prisma/client'

import { prisma } from '@app/lib/prisma-client'

import { TransactionsRepository } from '../@types/transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(
    data: Prisma.TransactionUncheckedCreateInput
  ): Promise<Transaction> {
    return await prisma.transaction.create({
      data
    })
  }

  async findManyByUserId(userId: string): Promise<Transaction[]> {
    return await prisma.transaction.findMany({
      where: {
        user_id: userId
      }
    })
  }
}
