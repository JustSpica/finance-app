/* eslint-disable camelcase */
import { hash } from 'bcryptjs'

import { UsersRepository } from '@app/repositories/@types/users-repository'

import { UserAlreadyExistError } from './errors'

interface CreateUserUseCaseRequest {
  email: string
  password: string
  username: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ email, username, password }: CreateUserUseCaseRequest) {
    const usersWithSameEmail = await this.usersRepository.findByEmail(email)

    if (usersWithSameEmail) {
      throw new UserAlreadyExistError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      email,
      username,
      password_hash
    })

    return { user }
  }
}
