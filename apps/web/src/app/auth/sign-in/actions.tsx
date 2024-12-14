'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'

export async function signInWithEmailAndPassword(data: FormData) {
  const { email, password } = Object.fromEntries(data)

  await signInWithPassword({
    email: email.toString(),
    password: password.toString(),
  })
}
