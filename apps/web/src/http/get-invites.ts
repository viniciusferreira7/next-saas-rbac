import type { Role } from '@saas/auth'

import { api } from './api-client'

export interface GetInvitesResponse {
  invites: Array<{
    id: string
    email: string
    role: Role
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }>
}

interface GetInvitesParams {
  orgSlug: string
}

export async function getInvites({
  orgSlug,
}: GetInvitesParams): Promise<GetInvitesResponse> {
  const data = await api
    .get(`organization/${orgSlug}/invites`, {
      next: {
        tags: [`${orgSlug}/invites`],
      },
    })
    .json<GetInvitesResponse>()

  return data
}
