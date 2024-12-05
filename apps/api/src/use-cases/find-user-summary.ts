import { TransactionsRepository } from '@app/repositories/@types/transactions-repository'
import { UsersRepository } from '@app/repositories/@types/users-repository'

import { UserDoesNotExist } from './errors'

interface FindUserSummaryUseCaseRequest {
  userId: string
}

interface FindUserSummaryUseCaseResponse {
  summary: {
    budget: number | null
    input: number
    output: number
  }
}

export class FindUserSummaryUseCase {
  constructor(
    private transactionRepository: TransactionsRepository,
    private usersRepository: UsersRepository
  ) {}

  async handle({
    userId
  }: FindUserSummaryUseCaseRequest): Promise<FindUserSummaryUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserDoesNotExist()
    }

    const transactions =
      await this.transactionRepository.findManyByUserId(userId)

    const { input, output } = transactions.reduce(
      (acc, item) => {
        if (item.type === 'input') {
          acc.input += item.value
        } else {
          acc.output += item.value
        }

        return acc
      },
      { input: 0, output: 0 }
    )

    const limitAlert = (100 * output) / user.budget

    const summary = {
      budget: user.budget,
      input,
      output,
      limit_alert: limitAlert > 70,
      surplus_alert: output > user.budget
    }

    return { summary }
  }
}
