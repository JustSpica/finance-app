import { FastifyInstance } from 'fastify'

import { UsersController } from './controllers/users.controller'
import { TransactionsController } from './controllers/transactions.controller'

const usersController = new UsersController()
const transactionsController = new TransactionsController()

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', usersController.create)
  app.post('/users/auth', usersController.authenticate)

  app.post('/transactions', transactionsController.create)
}
