export interface CreateUserRequest {
  email: string
  password: string
  username: string
}

export interface CreateUserResponse {
  token: string
  user: {
    budget: string | null
    created_at: Date
    email: string
    id: string
    username: string
  }
}

export interface AuthenticateUserRequest {
  email: string
  password: string
}

export interface AuthenticateUserResponse {
  token: string
  user: {
    budget: string | null
    created_at: Date
    email: string
    id: string
    username: string
  }
}

export interface FindSummaryResponse {
  budget: number | null
  input: number
  output: number
  limit_alert: boolean
  surplus_alert: boolean
}
export interface UpdateUserBudgetResponse {
  user: {
    budget: string | null
    created_at: Date
    email: string
    id: string
    username: string
  }
}
