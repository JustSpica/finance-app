import { api } from '@/lib/axios'

import {
  CreateUserResponse,
  CreateUserRequest,
  SignInUserRequest,
  SignInUserResponse,
  UpdateUserBudgetRequest
} from './types/users'

export class UsersService {
  async create(data: CreateUserRequest) {
    return await api.post<CreateUserResponse>('/users', data)
  }

  async auth(data: SignInUserRequest) {
    return await api.post<SignInUserResponse>('/users/auth', data)
  }

  async updateBudget(data: UpdateUserBudgetRequest) {
    return await api.put('/users/budget', data)
  }

  static make() {
    const users = new UsersService()

    return users
  }
}
