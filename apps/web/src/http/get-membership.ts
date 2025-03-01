import { type Role } from '@saas/auth'

import { api } from './api-client'

export interface GetMembershipRequest {
  slug: string
}

export interface GetMembershipResponse {
  membership: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }
}

export async function getMembership({
  slug,
}: GetMembershipRequest): Promise<GetMembershipResponse> {
  const data = await api
    .get(`organizations/${slug}/membership`, {})
    .json<GetMembershipResponse>()

  return data
}
