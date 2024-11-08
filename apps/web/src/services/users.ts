import { api } from '@app/lib/axios'

type CreateUserRequest = {
  email: string
  password: string
  username: string
}

type CreateUserResponse = {
  user: {
    created_at: Date
    email: string
    id: string
    password_hash: string
    username: string
  }
  token: string
}

export async function createUserService(req: CreateUserRequest) {
  return await api.post<CreateUserResponse>('/users', req)
}
