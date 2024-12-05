import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { appRoutes } from './http/routes'

export const app = fastify()

app.register(cors)
app.register(jwt, {
  secret: 'finance-app',
  sign: { expiresIn: '24h' }
})
app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  console.log(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})
