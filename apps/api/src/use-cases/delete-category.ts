import { CategoriesRepository } from '@app/repositories/@types/categories-repository'

interface DeleteCategoryUseCaseRequest {
  id: string
}

export class DeleteCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async handle({ id }: DeleteCategoryUseCaseRequest) {
    const category = await this.categoriesRepository.delete(id)

    return { category }
  }
}
