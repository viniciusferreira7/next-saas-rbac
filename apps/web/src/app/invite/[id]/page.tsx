import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LogIn } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth, isAuthenticated } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { acceptInvite } from '@/http/accept-invite'
import { getInvite } from '@/http/get-invite'

dayjs.extend(relativeTime)

interface InvitePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { id } = await params

  const [{ invite }, isUserAuthenticate] = await Promise.all([
    await getInvite({
      inviteId: id,
    }),
    isAuthenticated(),
  ])

  const currentUserEmail = (await auth()).user?.email ?? null
  const userIsAuthenticatedWithSameEmailFromInvite =
    currentUserEmail === invite.email

  async function signInFromInvite() {
    'use server'

    const cookieStorage = await cookies()

    cookieStorage.set('invite-id', invite.id)

    redirect(`/auth/sign-in?email=${invite.email}`)
  }

  async function acceptInviteAction() {
    'use server'

    await acceptInvite({
      inviteId: invite.id,
    })

    redirect('/')
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center gap-y-6">
        <div className="flex flex-col items-center gap-y-4">
          <Avatar className="size-16 shrink-0">
            {invite?.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback>
              {invite.author?.name?.charAt(0)}{' '}
              {invite?.author?.name?.split(' ')?.[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className="text-balance text-center leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite?.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="font-medium text-foreground">
              {invite.organization.name}.
            </span>{' '}
            <span className="text-xs">{dayjs(invite.createdAt).fromNow()}</span>
          </p>

          <Separator />
          {!isUserAuthenticate && (
            <form action={signInFromInvite}>
              <Button type="submit" variant="secondary" className="w-full">
                <LogIn className="mr-2 size-4 shrink-0" />
                Sign in to accept invite
              </Button>
            </form>
          )}

          {userIsAuthenticatedWithSameEmailFromInvite && (
            <form action={acceptInviteAction}>
              <Button type="submit" variant="secondary" className="w-full">
                <LogIn className="mr-2 size-4 shrink-0" />
                Join {invite.organization.name}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
