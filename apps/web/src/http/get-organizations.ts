import { api } from './api-client'

export interface GetOrganizationsResponse {
  organizations: Array<{
    name: string
    id: string
    slug: string
    avatarUrl: string | null
  }>
}

export async function getOrganizations(): Promise<GetOrganizationsResponse> {
  const data = await api.get('organizations').json<GetOrganizationsResponse>()

  return data
}
