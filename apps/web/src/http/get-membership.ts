import { type Role } from '@saas/auth'

import { api } from './api-client'

export interface GetMembershipRequest {
  params: {
    slug: string
  }
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
  params,
}: GetMembershipRequest): Promise<GetMembershipResponse> {
  const data = await api
    .get(`organizations/${params.slug}/membership`, {})
    .json<GetMembershipResponse>()

  return data
}
