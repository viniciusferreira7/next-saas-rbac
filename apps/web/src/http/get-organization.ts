import { api } from './api-client'

interface GetOrganizationRequest {
  org: string
}

export interface GetOrganizationResponse {
  organization: {
    name: string
    id: string
    slug: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

export async function getOrganization({
  org,
}: GetOrganizationRequest): Promise<GetOrganizationResponse> {
  const data = await api
    .get(`organizations/${org}`)
    .json<GetOrganizationResponse>()

  return data
}
