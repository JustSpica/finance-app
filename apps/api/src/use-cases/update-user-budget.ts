import { UsersRepository } from '@app/repositories/@types/users-repository'

import { UserDoesNotExist } from './errors'

interface UpdateUserBudgetUseCaseRequest {
  userId: string
  value: number
}

export class UpdateUserBudgetUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ userId, value }: UpdateUserBudgetUseCaseRequest) {
    const userById = await this.usersRepository.findById(userId)

    if (!userById) {
      throw new UserDoesNotExist()
    }

    const user = await this.usersRepository.updateBudget(userId, value)
    delete user.password_hash

    return { user }
  }
}
