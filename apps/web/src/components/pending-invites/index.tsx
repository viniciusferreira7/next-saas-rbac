'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, Loader, UserPlus2, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { acceptInvite } from '@/http/accept-invite'
import { getPendingInvites } from '@/http/get-pending-invites'
import { rejectInvite } from '@/http/reject-invite'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

dayjs.extend(relativeTime)

interface PendingInvitesProps {
  onRevalidateTag: (tag: string) => Promise<void>
}

export function PendingInvites({ onRevalidateTag }: PendingInvitesProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
    enabled: isOpen,
  })

  const { mutate: mutateAcceptInvite, isPending: isAcceptInvitePending } =
    useMutation({
      mutationKey: ['accept-invite'],
      mutationFn: async (inviteId: string) =>
        await acceptInvite({
          inviteId,
        }),
    })

  async function handleAcceptInvite(inviteId: string) {
    mutateAcceptInvite(inviteId, {
      onSuccess: async () => {
        toast.success('Invite accepted')
        await onRevalidateTag('organizations')
        await refetch()
      },
      onError: () => {
        toast.error('An error occurred while trying to accept the invitation')
      },
    })
  }

  const { mutate: mutateRejectInvite, isPending: isRejectInvitePending } =
    useMutation({
      mutationKey: ['reject-invite'],
      mutationFn: async (inviteId: string) => await rejectInvite({ inviteId }),
    })

  async function handleRejectInvite(inviteId: string) {
    mutateRejectInvite(inviteId, {
      onSuccess: async () => {
        toast.success('Invite rejected')
        await refetch()
      },
      onError: () => {
        toast.error('An error occurred while trying to reject the invitation')
      },
    })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4 shrink-0" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-2">
        <span className="block text-sm font-medium">
          Pending invites ({data?.invites.length ?? 0})
        </span>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader className="size-4 animate-spin" />
          </div>
        ) : (
          <>
            {data?.invites.length ? (
              data?.invites?.map((invite) => {
                return (
                  <div key={invite.id} className="space-y-2">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {invite.author?.name ?? 'Someone'}
                      </span>{' '}
                      invited you to join{' '}
                      <span className="font-medium text-foreground">
                        {invite?.organization?.name}
                      </span>{' '}
                      <span>{dayjs(invite.createdAt).fromNow()}</span>
                    </p>

                    <div className="flex gap-1">
                      <Button
                        size="xs"
                        variant="outline"
                        disabled={
                          isAcceptInvitePending || isRejectInvitePending
                        }
                        onClick={() => handleAcceptInvite(invite.id)}
                      >
                        <Check className="mr-1.5 size-3 shrink-0" />
                        {isAcceptInvitePending ? 'Accepting...' : 'Accept'}
                      </Button>
                      <Button
                        size="xs"
                        variant="outline"
                        className="text-muted-foreground"
                        disabled={
                          isAcceptInvitePending || isRejectInvitePending
                        }
                        onClick={() => handleRejectInvite(invite.id)}
                      >
                        <X className="mr-1.5 size-3 shrink-0" />
                        {isRejectInvitePending ? 'Revoking...' : 'Reject'}
                      </Button>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-xs text-muted-foreground">No invites found</p>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
