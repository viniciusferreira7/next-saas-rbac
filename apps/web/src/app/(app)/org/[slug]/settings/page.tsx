import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getAbility, getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import { OrganizationForm } from '../../components/organization-form'
import { Billing } from './components/billing'
import { ShutdownOrganizationButton } from './components/shutdown-organization-button'

export async function generateMetadata(): Promise<Metadata> {
  const { currentOrg } = await getCurrentOrg()

  const { organization } = await getOrganization({
    org: currentOrg!,
  })

  return {
    title: `Settings - ${organization.name}`,
  }
}

export default async function SettingsPage() {
  const { currentOrg } = await getCurrentOrg()
  const { permissions } = await getAbility()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  const canGetBilling = permissions?.can('get', 'Billing')

  if (!currentOrg) {
    redirect('/')
  }

  const { organization } = await getOrganization({
    org: currentOrg,
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationForm
                isUpdating
                initialData={{
                  name: organization.name,
                  domain: organization.domain,
                  shouldAttachUsersByDomain:
                    organization.shouldAttachUsersByDomain,
                }}
              />
            </CardContent>
          </Card>
        )}

        {canGetBilling && <Billing />}

        {canShutdownOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown organization</CardTitle>
              <CardDescription>
                This will delete all organization data including all projects.
                You cannot undo this action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShutdownOrganizationButton />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
