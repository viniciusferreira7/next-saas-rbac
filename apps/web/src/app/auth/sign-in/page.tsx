import type { Metadata } from 'next'
import { Suspense } from 'react'

import { SignInForm } from './sign-in-form'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default function SignInPage() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <SignInForm />
    </Suspense>
  )
}
