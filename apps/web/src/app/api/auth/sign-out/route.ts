import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { TOKEN_NAME } from '@/app/utils/token'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/'

  cookieStore.delete(TOKEN_NAME)

  return NextResponse.redirect(new URL(redirectUrl))
}
