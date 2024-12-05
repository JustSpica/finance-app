import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { FetchUserUseCase } from '../fetch-user'

export function makeFetchUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const fetchUserUseCase = new FetchUserUseCase(usersRepository)

  return fetchUserUseCase
}
