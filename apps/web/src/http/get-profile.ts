import { api } from './api-client'

interface GetProfileResponse {
  user: {
    name: string | null
    id: string
    avatarUrl: string | null
    email: string
  }
}

export async function getProfile(): Promise<GetProfileResponse> {
  const data = await api.get('profile').json<GetProfileResponse>()

  return data
}
