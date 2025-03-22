import type { Metadata } from 'next'

import { getAbility, getCurrentOrg } from '@/auth/auth'
import { getOrganization } from '@/http/get-organization'

import { Invites } from './components/invites'
import { MemberList } from './components/member-list'

export async function generateMetadata(): Promise<Metadata> {
  const { currentOrg } = await getCurrentOrg()

  const { organization } = await getOrganization({
    org: currentOrg!,
  })

  return {
    title: `Members - ${organization.name}`,
  }
}

export default async function MembersPage() {
  const { permissions } = await getAbility()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Members</h1>
      <div className="space-y-4">
        {permissions?.can('get', 'Invite') && <Invites />}
        {permissions?.can('get', 'User') && <MemberList />}
      </div>
    </div>
  )
}
