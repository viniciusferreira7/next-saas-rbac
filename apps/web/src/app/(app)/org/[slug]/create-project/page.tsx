import type { Metadata } from 'next'

import { ProjectForm } from './project-form'

export const metadata: Metadata = {
  title: 'Create project',
}

export default function CreateProjectPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create project</h1>
      <ProjectForm />
    </div>
  )
}
