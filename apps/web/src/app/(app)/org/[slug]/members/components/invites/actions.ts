'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { revokeInvite } from '@/http/revoke-invite'

export async function revokeInviteAction(inviteId: string) {
  try {
    const { currentOrg } = await getCurrentOrg()

    if (!currentOrg) return

    await revokeInvite({
      org: currentOrg,
      inviteId,
    })

    revalidateTag(`${currentOrg}/invites`)
  } catch (err) {
    console.error(err)
  }
}
