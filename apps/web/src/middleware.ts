import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { TOKEN_NAME } from './app/utils/token'

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.has(TOKEN_NAME)

  if (hasToken) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/auth/sign-in', request.url))
}

export const config = {
  matcher: ['/'],
}
