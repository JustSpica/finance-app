import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category>
  delete(id: string): Promise<Category>
  findManyByUserId(userId: string): Promise<Category[]>
}
