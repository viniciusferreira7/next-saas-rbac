import type { Role } from '@saas/auth'

import { api } from './api-client'

export interface GetMembersResponse {
  members: Array<{
    userId: string
    name: string | null
    avatarUrl: string | null
    email: string
    id: string
    role: Role
  }>
}

interface GetMembersParams {
  orgSlug: string
}

export async function getMembers({
  orgSlug,
}: GetMembersParams): Promise<GetMembersResponse> {
  const data = await api
    .get(`organizations/${orgSlug}/members`, {
      next: {
        tags: [`${orgSlug}/members`],
      },
    })
    .json<GetMembersResponse>()

  return data
}
