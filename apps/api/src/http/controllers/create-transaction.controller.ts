import { FastifyReply, FastifyRequest } from "fastify";
import zod from "zod"

import { UserAlreadyExistError } from "../../use-cases/errors/user-already-exist.error"
import { makeRegisterUserUseCase } from "../../use-cases/factories/make-register-user-use-case"

export async function createTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const transactionData = zod.object({
    description: zod.string(),
    value: zod.string(),
    type: zod.string(),
    userId: zod.string(),
  })

  const { description, type, userId, value } = transactionData.parse(request.body);

  return reply.status(201).send();
}
