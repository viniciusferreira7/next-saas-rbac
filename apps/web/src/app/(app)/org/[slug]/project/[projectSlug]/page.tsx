interface ProjectPageProps {
  params: {
    slug: string
    projectSlug: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectSlug } = await params

  return <div>Project: {projectSlug}</div>
}
