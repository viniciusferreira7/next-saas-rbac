'use client'

import { AlertTriangle, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { GithubSvg } from '@/components/svg/github'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { signInWithEmailAndPassword } from './actions'

export default function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formState, handleSignIn, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push('/')
    },
  )

  const { success, message, errors } = formState

  return (
    <div className="space-y-4">
      <form onSubmit={handleSignIn} className="space-y-4">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={searchParams.get('email') ?? ''}
          />
          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.email[0]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.password[0]}
            </p>
          )}
          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="space-y-3">
          <Button type="submit" className="w-full">
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              'Sign-in with e-mail'
            )}
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/auth/sign-up" className="w-full">
              Create new account
            </Link>
          </Button>
        </div>
      </form>
      <form action={signInWithGithub}>
        <Separator />
        <Button type="submit" variant="outline" className="w-full">
          <GithubSvg className="size-4 fill-foreground" />
          Sign-in with gitHub
        </Button>
      </form>
    </div>
  )
}
