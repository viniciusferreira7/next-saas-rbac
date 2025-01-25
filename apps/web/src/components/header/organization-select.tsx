'use client'

import { ChevronsUpDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

import type { GetOrganizationsResponse } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenuTrigger } from '../ui/dropdown-menu'

interface OrganizationSelectProps {
  organizations: GetOrganizationsResponse['organizations']
}

export function OrganizationSelect({ organizations }: OrganizationSelectProps) {
  const pathname = usePathname()

  const [, , currentOrg] = pathname.split('/')

  const currentOrganization = organizations?.find(
    (org) => org.slug === currentOrg,
  )

  return (
    <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
      {currentOrganization ? (
        <>
          <Avatar className="mr-2 size-4">
            {currentOrganization.avatarUrl && (
              <AvatarImage src={currentOrganization.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>
          <span className="truncate text-left">{currentOrganization.name}</span>
        </>
      ) : (
        <span className="text-muted-foreground">Select organization</span>
      )}
      <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
    </DropdownMenuTrigger>
  )
}
