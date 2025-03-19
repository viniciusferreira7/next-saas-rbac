'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { TOKEN_NAME } from '@/app/utils/types/token'
import { acceptInvite } from '@/http/accept-invite'
import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z
    .string({ message: 'Please, provide your password.' })
    .min(1, { message: 'Your password must be 6 characters long.' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const cookieStore = await cookies()

  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    cookieStore.set(TOKEN_NAME, token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const inviteId = cookieStore.get('invite-id')?.value

    if (inviteId) {
      await acceptInvite({
        inviteId,
      })

      cookieStore.delete('invite-id')
    }

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in few minutes.',
      errors: null,
    }
  }
}
