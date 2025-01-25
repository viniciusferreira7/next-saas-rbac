import { type NextRequest, NextResponse } from 'next/server'

import { ORGANIZATION_SLUG } from './app/utils/types/organization-slug'
import { TOKEN_NAME } from './app/utils/types/token'

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.has(TOKEN_NAME)

  const { pathname } = request.nextUrl

  const response = NextResponse.next()

  if (pathname.startsWith('/org')) {
    const [, , slug] = pathname.split('/')
    response.cookies.set(ORGANIZATION_SLUG, slug)
  } else {
    response.cookies.delete(ORGANIZATION_SLUG)
  }

  if (hasToken) {
    return response
  }

  return NextResponse.redirect(new URL('/auth/sign-in', request.url))
}

export const config = {
  matcher: [
    '/',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Auth page
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)',
  ],
}
