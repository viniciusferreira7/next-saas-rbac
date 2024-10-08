import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

import { BadRequest } from '../_error/bad-request-error'

export async function createOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organization',
      {
        schema: {
          tags: ['organization'],
          summary: 'Create a new organization',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            domain: z.string().optional(),
            shouldAttachUsersByDomain: z.boolean().optional(),
          }),
          response: {
            201: z.object({
              organizationId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { name, domain, shouldAttachUsersByDomain } = request.body

        if (domain) {
          const organizationByDomain = await prisma.organization.findUnique({
            where: {
              domain,
            },
          })

          if (organizationByDomain) {
            throw new BadRequest(
              'Another organization with same domain already exists.',
            )
          }
        }

        const organization = await prisma.organization.create({
          data: {
            name,
            domain,
            slug: createSlug(name),
            shouldAttachUsersByDomain,
            ownerId: userId,
            members: {
              create: {
                role: 'ADMIN',
                userId,
              },
            },
          },
        })

        return reply.status(201).send({ organizationId: organization.id })
      },
    )
}
