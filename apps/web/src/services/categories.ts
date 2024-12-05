import { api } from '@/lib/axios'

import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  FindManyCategoriesResponse
} from './types/categories'

export async function create(data: CreateCategoryRequest) {
  const userId = localStorage.getItem('user-id')

  return await api.post<CreateCategoryResponse>('/categories', {
    ...data,
    userId
  })
}

export async function remove(id: string) {
  return await api.delete(`/categories/${id}`)
}

export async function findMany() {
  const userId = localStorage.getItem('user-id')

  const { data } = await api.get<FindManyCategoriesResponse[]>(
    '/categories/user',
    {
      params: { userId }
    }
  )

  return data
}
