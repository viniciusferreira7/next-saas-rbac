import { Plus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { getAbility } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { getOrganizations } from '@/http/get-organizations'

import { ProjectList } from './components/project-list'

interface OrgPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: OrgPageProps): Promise<Metadata> {
  const { slug } = await params
  const { organizations } = await getOrganizations()

  const currentOrganization = organizations?.find((org) => org.slug === slug)

  return {
    title: 'Projects - ' + currentOrganization?.name,
  }
}

export default async function OrgPage({ params }: OrgPageProps) {
  const [{ slug }, { permissions }] = await Promise.all([params, getAbility()])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link href={`/org/${slug}/create-project`}>
              <Plus className="mr-2 size-4 shrink-0" />
              Create project
            </Link>
          </Button>
        )}
      </div>
      {permissions?.can('get', 'Project') ? (
        <ProjectList orgSlug={slug} />
      ) : (
        <p className="text-sm text-muted-foreground">
          You are not allowed to see organization projects.
        </p>
      )}
    </div>
  )
}
