import type { Metadata } from 'next'

import { OrganizationForm } from '../org/components/organization-form'

export const metadata: Metadata = {
  title: 'Create Org',
}

export default function CreateOrganizationPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>
      <OrganizationForm />
    </div>
  )
}
