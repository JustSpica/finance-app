import { Prisma, Transaction } from '@prisma/client'

export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
  findManyByUserId(userId: string): Promise<Transaction[]>
}
