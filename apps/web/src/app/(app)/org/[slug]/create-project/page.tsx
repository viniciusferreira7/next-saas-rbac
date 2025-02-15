import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getAbility } from '@/auth/auth'

import { ProjectForm } from './project-form'

export const metadata: Metadata = {
  title: 'Create project',
}

export default async function CreateProjectPage() {
  const { permissions } = await getAbility()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create project</h1>
      <ProjectForm />
    </div>
  )
}
