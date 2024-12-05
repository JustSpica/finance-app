import { FastifyInstance } from 'fastify'

import {
  createTransactionController,
  findManyTransactionsByUserIdController
} from './controllers/transactions'
import { authUserController, createUserController } from './controllers/user'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/users/auth', authUserController)

  app.post('/transactions', createTransactionController)
  app.get('/transactions/user/:id', findManyTransactionsByUserIdController)
}
