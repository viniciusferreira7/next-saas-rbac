import type { Metadata } from 'next'

import { OrganizationForm } from './organization-form'

export const metadata: Metadata = {
  title: 'Create Org',
}

export default function CreateOrganizationPage() {
  return <OrganizationForm />
}
