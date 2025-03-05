'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'

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
