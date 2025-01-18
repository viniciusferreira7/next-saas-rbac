'use client'

import { AlertTriangle, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { GithubSvg } from '@/components/svg/github'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { signUpAction } from './action'

export function SignUpForm() {
  const router = useRouter()

  const [formState, handleSignIn, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
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
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.name[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" />
          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.email[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.password[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
          />
          {errors?.password_confirmation && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.password_confirmation[0]}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          {isPending ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>
        <Button variant="link" size="sm" className="w-full" asChild>
          <Link href="/auth/sign-in">Already register? Sign-in</Link>
        </Button>
      </form>
      <form action={signInWithGithub}>
        <Separator />
        <Button type="submit" variant="outline" className="w-full">
          <GithubSvg className="size-4 fill-foreground" />
          Sign up with gitHub
        </Button>
      </form>
    </div>
  )
}
