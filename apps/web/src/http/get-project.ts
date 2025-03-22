import { api } from './api-client'

export interface GetProjectResponse {
  project: {
    name: string
    id: string
    slug: string
    avatarUrl: string | null
    ownerId: string
    organizationId: string
    description: string
    owner: {
      name: string | null
      id: string
      avatarUrl: string | null
    }
  }
}

interface GetProjectParams {
  orgSlug: string
  projectSlug: string
}

export async function getProject({
  orgSlug,
  projectSlug,
}: GetProjectParams): Promise<GetProjectResponse> {
  const data = await api
    .get(`organizations/${orgSlug}/projects/${projectSlug}`, {
      next: {
        tags: [`${orgSlug}/projects`],
      },
    })
    .json<GetProjectResponse>()

  return data
}
