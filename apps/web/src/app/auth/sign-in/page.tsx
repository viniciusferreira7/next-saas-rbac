import Link from 'next/link'

import { GithubSvg } from '@/components/svg/github'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailAndPassword } from './action'

export default function SignInPage() {
  return (
    <form action={signInWithEmailAndPassword} className="space-y-4">
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline">
          Forgot your password?
        </Link>
      </div>
      <Button type="submit" className="w-full">
        Sign-in with e-mail
      </Button>
      <Separator />
      <Button type="submit" variant="outline" className="w-full">
        <GithubSvg className="size-4 fill-foreground" />
        Sign-in with gitHub
      </Button>
    </form>
  )
}
