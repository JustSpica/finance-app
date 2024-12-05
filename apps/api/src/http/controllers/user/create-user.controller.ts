import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { makeCreateUserUseCase } from '@app/use-cases/factories'
import { UserAlreadyExistError } from '@app/use-cases/errors'

export async function createUserController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const reqSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
  })

  const { email, password, username } = reqSchema.parse(req.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()

    const { user } = await createUserUseCase.handle({
      email,
      password,
      username
    })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id
        }
      }
    )

    return res.status(201).send({ user, token })
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      return res.status(409).send({ message: error.message })
    }

    throw error
  }
}
