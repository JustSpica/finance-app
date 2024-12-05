import { CategoriesRepository } from '@app/repositories/@types/categories-repository'
import { UsersRepository } from '@app/repositories/@types/users-repository'

import { UserDoesNotExist } from './errors'

interface FindManyCategoriesByUserIdUseCaseRequest {
  userId: string
}

export class FindManyCategoriesByUserIdUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private usersRepository: UsersRepository
  ) {}

  async handle({ userId }: FindManyCategoriesByUserIdUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserDoesNotExist()
    }

    const categories = await this.categoriesRepository.findManyByUserId(userId)

    return { categories }
  }
}
