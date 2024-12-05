import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { AuthenticateUserUseCase } from '@app/use-cases/authenticate-user'
import { InvalidCredentialsError } from '@app/use-cases/errors'

export async function auth(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
  })

  const { email, password } = bodySchema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

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
