import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { TOKEN_NAME } from '@/app/utils/token'
import { getProfile } from '@/http/get-profile'

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
