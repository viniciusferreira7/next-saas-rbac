'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSignInURL = new URL(
    '/login/oauth/authorize',
    'https://github.com',
  )

  githubSignInURL.searchParams.set('client_id', 'dfsdf')
  githubSignInURL.searchParams.set('redirect_uri', '/')
  githubSignInURL.searchParams.set('scope', 'user')

  redirect(githubSignInURL.toString())
}
