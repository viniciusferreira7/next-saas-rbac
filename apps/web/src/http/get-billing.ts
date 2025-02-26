import { api } from './api-client'

interface GetBillingRequest {
  org: string
}

export interface GetBillingResponse {
  billing: {
    seats: {
      amountOfMembers: number
      unit: number
      price: number
    }
    projects: {
      amountOfProjects: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBilling({
  org,
}: GetBillingRequest): Promise<GetBillingResponse> {
  const data = await api
    .get(`organizations/${org}/billing`)
    .json<GetBillingResponse>()

  return data
}
