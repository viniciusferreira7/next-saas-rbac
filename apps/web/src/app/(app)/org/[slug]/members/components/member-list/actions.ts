'use server'

import type { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
  try {
    const { currentOrg } = await getCurrentOrg()

    if (!currentOrg) return

    await removeMember({
      org: currentOrg,
      memberId,
    })

    revalidateTag(`${currentOrg}/members`)
  } catch (err) {
    console.error(err)
  }
}

export async function updateMemberAction(memberId: string, role: Role) {
  try {
    const { currentOrg } = await getCurrentOrg()

    if (!currentOrg) return

    await updateMember({
      org: currentOrg,
      memberId,
      role,
    })

    revalidateTag(`${currentOrg}/members`)
  } catch (err) {
    console.error(err)
  }
}
