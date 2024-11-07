import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import {
  makeAuthenticateUserUseCase,
  makeCreateUserUseCase
} from '@app/use-cases/factories'
import { UserAlreadyExistError } from '@app/use-cases/errors'

export class UsersController {
  async authenticate(req: FastifyRequest, reply: FastifyReply) {
    const authenticateUserSchema = zod.object({
      email: zod.string().email(),
      password: zod.string().min(6)
    })

    const { email, password } = authenticateUserSchema.parse(req.body)

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

      return reply.status(201).send({ user, token })
    } catch (error) {
      console.error(error)

      throw error
    }
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = zod.object({
      username: zod.string(),
      email: zod.string().email(),
      password: zod.string().min(6)
    })

    const { email, username, password } = createUserSchema.parse(req.body)

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

      return reply.status(201).send({ user, token })
    } catch (error) {
      if (error instanceof UserAlreadyExistError) {
        return reply.status(409).send({ message: error.message })
      }

      throw error
    }
  }
}
