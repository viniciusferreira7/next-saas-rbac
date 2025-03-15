import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getInvite } from '@/http/get-invite'

dayjs.extend(relativeTime)

interface InvitePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { id } = await params

  const { invite } = await getInvite({
    inviteId: id,
  })

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
        </div>
      </div>
    </div>
  )
}
