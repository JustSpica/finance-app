import { compare } from 'bcryptjs'

import { UsersRepository } from '@app/repositories/@types/users-repository'

import { InvalidCredentialsError } from './errors'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ email, password }: AuthenticateUserUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }
  }
}
