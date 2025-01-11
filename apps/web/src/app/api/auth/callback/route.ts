import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { TOKEN_NAME } from '@/app/utils/token'
import { signInWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      {
        message: 'Github auth not found',
      },
      { status: 400 },
    )
  }

  const { token } = await signInWithGithub({ code })

  cookieStore.set(TOKEN_NAME, token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dayjs
  })

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(new URL(redirectUrl))
}
