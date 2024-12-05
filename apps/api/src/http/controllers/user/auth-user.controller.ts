import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { InvalidCredentialsError } from '@app/use-cases/errors'
import { makeAuthenticateUserUseCase } from '@app/use-cases/factories'

export async function authUserController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const reqSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
  })

  const { email, password } = reqSchema.parse(req.body)

  try {
    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    const { user } = await authenticateUserUseCase.handle({
      email,
      password
    })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id
        }
      }
    )

    return res.status(200).send({ user, token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).send({ message: error.message })
    }

    throw error
  }
}
