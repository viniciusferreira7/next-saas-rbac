import type { Metadata } from 'next'

import { getProject } from '@/http/get-project'

interface ProjectPageProps {
  params: {
    slug: string
    projectSlug: string
  }
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug, projectSlug } = await params

  const { project } = await getProject({
    orgSlug: slug,
    projectSlug,
  })

  return {
    title: project.name.slice(8).concat('...'),
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectSlug } = await params

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Project: {projectSlug}</h1>
    </div>
  )
}
