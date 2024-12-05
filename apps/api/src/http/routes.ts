import { FastifyInstance } from 'fastify'

import * as CategoriesController from './controllers/categories'
import * as TransactionsController from './controllers/transactions'
import * as UsersController from './controllers/user'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', UsersController.create)
  app.post('/users/auth', UsersController.auth)
  app.get('/users/summary', UsersController.findSummary)
  app.put('/users/budget', UsersController.updateBudget)

  app.post('/categories', CategoriesController.create)
  app.delete('/categories/:id', CategoriesController.remove)
  app.get('/categories/user', CategoriesController.findManyByUserId)

  app.post('/transactions', TransactionsController.create)
  app.delete('/transactions/:id', TransactionsController.remove)
  app.get('/transactions/user', TransactionsController.findManyByUserId)
}
