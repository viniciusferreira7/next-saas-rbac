import { api } from './api-client'

interface CreateProjectRequest {
  orgSlug: string
  name: string
  description: string | null
}

interface CreateProjectResponse {
  projectId: string
}

export async function createProject({
  orgSlug,
  name,
  description,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  const data = await api
    .post(`organizations/${orgSlug}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json<CreateProjectResponse>()

  return data
}
