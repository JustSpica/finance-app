import { api } from '@/lib/axios'

import {
  AuthenticateUserRequest,
  AuthenticateUserResponse,
  CreateUserResponse,
  CreateUserRequest,
  FindSummaryResponse,
  UpdateUserBudgetResponse
} from './types/users'

export async function create(data: CreateUserRequest) {
  return await api.post<CreateUserResponse>('/users', data)
}

export async function authenticate(data: AuthenticateUserRequest) {
  return await api.post<AuthenticateUserResponse>('/users/auth', data)
}

export async function findSummary() {
  const userId = localStorage.getItem('user-id')

  const { data } = await api.get<FindSummaryResponse>('/users/summary', {
    params: { userId }
  })

  return data
}

export async function updateBudget(value: number) {
  const userId = localStorage.getItem('user-id')

  const { data } = await api.put<UpdateUserBudgetResponse>(
    '/users/budget',
    {
      value
    },
    {
      params: { userId }
    }
  )

  return data
}
