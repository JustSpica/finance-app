import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import {
  InvalidCredentialsError,
  UserAlreadyExistError,
  UserDoesNotExist
} from '@app/use-cases/errors'
import {
  makeAuthenticateUserUseCase,
  makeCreateUserUseCase,
  makeUpdateUserBudgetUseCase
} from '@app/use-cases/factories'

export class UsersController {
  async authenticate(req: FastifyRequest, reply: FastifyReply) {
    const bodySchema = zod.object({
      email: zod.string().email(),
      password: zod.string().min(6)
    })

    const { email, password } = bodySchema.parse(req.body)

    try {
      const authenticateUserUseCase = makeAuthenticateUserUseCase()

      const { user } = await authenticateUserUseCase.handle({ email, password })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id
          }
        }
      )

      return reply.status(201).send({ ...user, token })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(401).send({ message: error.message })
      }

      throw error
    }
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const bodySchema = zod.object({
      username: zod.string(),
      email: zod.string().email(),
      password: zod.string().min(6)
    })

    const { email, username, password } = bodySchema.parse(req.body)

    try {
      const createUserUseCase = makeCreateUserUseCase()

      const { user } = await createUserUseCase.handle({
        email,
        username,
        password
      })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id
          }
        }
      )

      return reply.status(201).send({ ...user, token })
    } catch (error) {
      if (error instanceof UserAlreadyExistError) {
        return reply.status(409).send({ message: error.message })
      }

      throw error
    }
  }

  async updateBudget(req: FastifyRequest, reply: FastifyReply) {
    const bodySchema = zod.object({
      id: zod.string(),
      value: zod.string()
    })

    const { id, value } = bodySchema.parse(req.body)

    try {
      const updateUserBudgetUseCase = makeUpdateUserBudgetUseCase()

      const { user } = await updateUserBudgetUseCase.handle({ id, value })

      return reply.status(201).send(user)
    } catch (error) {
      if (error instanceof UserDoesNotExist) {
        return reply.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}
