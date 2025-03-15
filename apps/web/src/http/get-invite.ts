import type { Role } from '@saas/auth'

import { api } from './api-client'

export interface GetInviteResponse {
  invite: {
    id: string
    email: string
    role: Role
    createdAt: string
    organization: {
      name: string
    }
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }
}

interface GetInviteParams {
  inviteId: string
}

export async function getInvite({
  inviteId,
}: GetInviteParams): Promise<GetInviteResponse> {
  const data = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()

  return data
}
