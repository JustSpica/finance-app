export interface CreateCategoryRequest {
  name: string
}

export interface CreateCategoryResponse {
  category: {
    id: string
    name: string
    user_id: string
  }
}

export interface FindManyCategoriesResponse {
  id: string
  name: string
  user_id: string
}
