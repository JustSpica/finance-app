import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

import { PrismaUsersRepository } from '@app/repositories/prisma/prisma-users-repository'

import { CreateUserUseCase } from '@app/use-cases/create-user'
import { UserAlreadyExistError } from '@app/use-cases/errors'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
  })

  const { email, password, username } = bodySchema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

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
