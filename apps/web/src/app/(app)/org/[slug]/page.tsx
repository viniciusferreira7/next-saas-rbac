import type { Metadata } from 'next'

import { getOrganizations } from '@/http/get-organizations'

interface OrgPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: OrgPageProps): Promise<Metadata> {
  const { slug } = await params
  const { organizations } = await getOrganizations()

  const currentOrganization = organizations?.find((org) => org.slug === slug)

  return {
    title: currentOrganization?.name,
  }
}

export default async function OrgPage({ params }: OrgPageProps) {
  const { slug } = await params

  return <div>{slug}</div>
}
