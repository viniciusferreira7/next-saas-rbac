import type { Metadata } from 'next'
import Link from 'next/link'

import { GithubSvg } from '@/components/svg/github'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Sign up',
}

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" />
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      <div>
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
        />
      </div>
      <Button type="submit" className="w-full">
        Create account
      </Button>
      <Button variant="link" size="sm" className="w-full" asChild>
        <Link href="/auth/sign-in">Already register? Sign-in</Link>
      </Button>
      <Separator />
      <Button type="submit" variant="outline" className="w-full">
        <GithubSvg className="size-4 fill-foreground" />
        Sign-up with gitHub
      </Button>
    </form>
  )
}
