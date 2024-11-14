import { UsersRepository } from '@app/repositories/@types/users-repository'

import { UserDoesNotExist } from './errors'

interface UpdateUserBudgetUseCaseRequest {
  id: string
  value: string
}

export class UpdateUserBudgetUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ id, value }: UpdateUserBudgetUseCaseRequest) {
    const checkUser = await this.usersRepository.findById(id)

    if (!checkUser) {
      throw new UserDoesNotExist()
    }

    const integerValue = parseInt(
      value.replace(',', '').replace('.', '').trim()
    )

    const user = await this.usersRepository.updateBudget(id, integerValue)

    return { user }
  }
}
