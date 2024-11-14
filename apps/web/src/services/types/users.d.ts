export interface CreateUserRequest {
  email: string
  password: string
  username: string
}

export interface CreateUserResponse {
  created_at: Date
  email: string
  id: string
  password_hash: string
  username: string
  token: string
}

export interface SignInUserRequest {
  email: string
  password: string
}

export interface SignInUserResponse {
  created_at: Date
  email: string
  id: string
  password_hash: string
  username: string
  token: string
}
