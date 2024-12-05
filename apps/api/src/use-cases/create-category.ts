import { CategoriesRepository } from '@app/repositories/@types/categories-repository'
import { UsersRepository } from '@app/repositories/@types/users-repository'

import { TooManyCategories, UserDoesNotExist } from './errors'

interface CreateCategoryUseCaseRequest {
  name: string
  userId: string
}

export class CreateCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private usersRepository: UsersRepository
  ) {}

  async handle({ name, userId }: CreateCategoryUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserDoesNotExist()
    }

    const categories = await this.categoriesRepository.findManyByUserId(userId)

    if (categories.length === 5) {
      throw new TooManyCategories()
    }

    const category = await this.categoriesRepository.create({
      name,
      user_id: userId
    })

    return { category }
  }
}
