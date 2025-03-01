import { getAbility } from '@/auth/auth'

import { Invites } from './components/invites'
import { MemberList } from './components/member-list'

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
