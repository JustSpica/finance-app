import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { UpdateUserBudgetUseCase } from '../update-user-budget'

export function makeUpdateUserBudgetUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const updateUserBudgetUseCase = new UpdateUserBudgetUseCase(usersRepository)

  return updateUserBudgetUseCase
}
