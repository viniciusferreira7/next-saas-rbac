import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_error/bad-request-error'
import { UnauthorizedError } from '../_error/unauthorized-error'

export async function revokeInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug/invites/:inviteId',
      {
        schema: {
          tags: ['invites'],
          summary: 'Revoke a new invite',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            inviteId: z.string().uuid(),
          }),
          body: z.object({
            email: z.string().email(),
            role: roleSchema,
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, inviteId } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('delete', 'Invite')) {
          throw new UnauthorizedError(`You're not allowed to revoke an invite.`)
        }

        const invite = await prisma.invite.findUnique({
          where: {
            id: inviteId,
            authorId: userId,
            organizationId: organization.id,
          },
        })

        if (!invite) {
          throw new BadRequestError('Invite not found.')
        }

        await prisma.invite.delete({
          where: {
            id: inviteId,
            authorId: userId,
            organizationId: organization.id,
          },
        })

        reply.status(204).send()
      },
    )
}
