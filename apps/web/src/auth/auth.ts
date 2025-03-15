import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ORGANIZATION_SLUG } from '@/app/utils/types/organization-slug'
import { TOKEN_NAME } from '@/app/utils/types/token'
import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const cookieStorage = await cookies()

  return cookieStorage.has(TOKEN_NAME)
}

export async function getCurrentOrg() {
  const cookieStore = await cookies()

  const currentOrg = cookieStore.get(ORGANIZATION_SLUG)?.value ?? null

  return {
    currentOrg,
  }
}

export async function getCurrentMembership() {
  const { currentOrg } = await getCurrentOrg()

  if (!currentOrg) {
    return {
      membership: null,
    }
  }

  const { membership } = await getMembership({ slug: currentOrg })

  return { membership }
}
export async function getAbility() {
  const { membership } = await getCurrentMembership()

  if (!membership) {
    return {
      permissions: null,
    }
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return {
    permissions: ability,
  }
}

export async function auth() {
  const cookieStore = await cookies()

  const token = cookieStore.get(TOKEN_NAME)

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (err) {
    console.error(err)
  }

  redirect('api/auth/sign-out')
}
