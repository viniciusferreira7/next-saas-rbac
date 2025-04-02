'use server'

import { roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createInvite } from '@/http/create-invite'
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

const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address' }),
  role: roleSchema,
})

export async function createInviteAction(data: FormData) {
  const result = inviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, role } = result.data

  const { currentOrg } = await getCurrentOrg()

  try {
    if (!currentOrg)
      return {
        success: false,
        message: 'Organization not found',
        errors: null,
      }

    await createInvite({
      orgSlug: currentOrg,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`)

    return {
      success: true,
      message: 'Successfully saved the project',
      errors: null,
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in few minutes.',
      errors: null,
    }
  }
}
