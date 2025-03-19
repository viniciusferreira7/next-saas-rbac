import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'

import { getAbility, getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
  const { currentOrg } = await getCurrentOrg()

  const [{ membership }, { members }, { organization }, { permissions }] =
    await Promise.all([
      getMembership({ slug: currentOrg! }),
      getMembers({ orgSlug: currentOrg! }),
      getOrganization({ org: currentOrg! }),
      getAbility(),
    ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Members</h2>
      <Table>
        <TableBody>
          {members.map((member) => {
            return (
              <TableRow key={member.id}>
                <TableCell className="py-2.5" style={{ width: 48 }}>
                  <Avatar>
                    <AvatarFallback>
                      {member.name?.split(' ')[0].charAt(0)}{' '}
                      {member.name?.split(' ')?.[1].charAt(0)}
                    </AvatarFallback>
                    {member.avatarUrl && (
                      <AvatarImage
                        src={member.avatarUrl}
                        alt=""
                        width={32}
                        height={32}
                        className="aspect-square size-full"
                      />
                    )}
                  </Avatar>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center gap-2 font-medium">
                      {member.name}
                      {member.userId === membership.userId && ' (me)'}
                      {member.userId === organization.ownerId && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Crown className="size-3 shrink-0" />
                          Owner
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {member.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    {permissions?.can(
                      'transfer_ownership',
                      authOrganization,
                    ) && (
                      <Button size="sm" variant="ghost">
                        <ArrowLeftRight className="mr-2 size-4 shrink-0" />
                        Transfer ownership
                      </Button>
                    )}
                    <UpdateMemberRoleSelect
                      memberId={member.id}
                      value={member.role}
                      disabled={
                        member.userId === membership.userId ||
                        member.userId === organization.ownerId ||
                        permissions?.cannot('update', 'User')
                      }
                    />
                    {permissions?.can('delete', 'User') && (
                      <form action={removeMemberAction.bind(null, member.id)}>
                        <Button
                          type="submit"
                          size="sm"
                          variant="destructive"
                          disabled={
                            member.userId === membership.userId ||
                            member.userId === organization.ownerId
                          }>
                          <UserMinus className="mr-2 size-4 shrink-0" />
                          Remove
                        </Button>
                      </form>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
