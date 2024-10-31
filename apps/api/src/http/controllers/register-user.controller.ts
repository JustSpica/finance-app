import { FastifyReply, FastifyRequest } from "fastify";
import zod from "zod"

import { UserAlreadyExistError } from "../../use-cases/errors/user-already-exist.error"
import { makeRegisterUserUseCase } from "../../use-cases/factories/make-register-user-use-case"

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userDataSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
  })

  const { email, name, password } = userDataSchema.parse(request.body);

  try {
    const registerUserUseCase = makeRegisterUserUseCase();

    await registerUserUseCase.handle({ email, name, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
