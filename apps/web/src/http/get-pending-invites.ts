import type { Role } from '@saas/auth'

import { api } from './api-client'

export interface GetPendingInvitesResponse {
  invites: Array<{
    id: string
    createdAt: Date
    role: Role
    email: string
    author: {
      name: string | null
      id: string
      avatarUrl: string | null
    } | null
    organization: {
      name: string
      slug: string
    }
  }>
}

export async function getPendingInvites(): Promise<GetPendingInvitesResponse> {
  const data = await api
    .get(`pending-invites`)
    .json<GetPendingInvitesResponse>()

  return data
}
