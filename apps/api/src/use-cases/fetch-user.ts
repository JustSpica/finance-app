import { UsersRepository } from '@app/repositories/@types/users-repository'

import { UserDoesNotExist } from './errors'

interface FetchUserUseCaseRequest {
  id: string
}

export class FetchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ id }: FetchUserUseCaseRequest) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserDoesNotExist()
    }

    return { user }
  }
}
