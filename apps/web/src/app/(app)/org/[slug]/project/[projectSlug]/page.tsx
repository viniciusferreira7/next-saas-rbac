interface ProjectPageProps {
  params: {
    slug: string
    projectSlug: string
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
