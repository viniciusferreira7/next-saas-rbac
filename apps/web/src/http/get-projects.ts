import { api } from './api-client'

export interface GetProjectsResponse {
  projects: Array<{
    name: string
    id: string
    slug: string
    avatarUrl: string | null
    createdAt: string
    ownerId: string
    organizationId: string
    description: string
    owner: {
      name: string | null
      id: string
      avatarUrl: string | null
    }
  }>
}

interface GetProjectsParams {
  orgSlug: string
}

export async function getProjects({
  orgSlug,
}: GetProjectsParams): Promise<GetProjectsResponse> {
  const data = await api
    .get(`organizations/${orgSlug}/projects`, {
      next: {
        tags: [`${orgSlug}/projects`],
      },
    })
    .json<GetProjectsResponse>()

  return data
}
