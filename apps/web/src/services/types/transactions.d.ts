export interface CreateTransactionRequest {
  categoryId?: string | null
  description: string
  type: 'input' | 'output'
  value: number
}

export interface CreateTransactionResponse {
  transaction: {
    id: string
    description: string
    value: number
    type: 'input' | 'output'
    user_id: string
    category_id?: string | null
  }
}

export interface FindManyTransactionsResponse {
  id: string
  description: string
  value: number
  type: 'input' | 'output'
  user_id: string
  category_id?: string | null
}
