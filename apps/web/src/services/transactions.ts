import { api } from '@/lib/axios'

import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  FindManyTransactionsResponse
} from './types/transactions'

export async function create(data: CreateTransactionRequest) {
  const userId = localStorage.getItem('user-id')

  return await api.post<CreateTransactionResponse>('/transactions', {
    ...data,
    userId
  })
}

export async function remove(id: string) {
  return await api.delete(`/transactions/${id}`)
}

export async function findMany() {
  const userId = localStorage.getItem('user-id')

  const { data } = await api.get<FindManyTransactionsResponse[]>(
    '/transactions/user',
    {
      params: { userId }
    }
  )

  return data
}
