'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'

export async function signInWithEmailAndPassword(
  previousState: unknown,
  data: FormData,
) {
  const { email, password } = Object.fromEntries(data)

  await signInWithPassword({
    email: email.toString(),
    password: password.toString(),
  })

  return 'Sucesso'
}
