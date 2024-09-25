import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequest } from './_error/bad-request-error'
import { UnauthorizedError } from './_error/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message })
  }
  if (error instanceof UnauthorizedError) {
    return reply.status(400).send({ message: error.message })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal Server Error.' })
}