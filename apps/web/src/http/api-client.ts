import { type CookiesFn, getCookie } from 'cookies-next'
import ky from 'ky'

import { TOKEN_NAME } from '@/app/utils/types/token'

export const api = ky.create({
  prefixUrl: 'https//:localhost:3333',
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
        }

        const token = await getCookie(TOKEN_NAME, { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
