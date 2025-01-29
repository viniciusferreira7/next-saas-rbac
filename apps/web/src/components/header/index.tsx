import { Slash } from 'lucide-react'
import Link from 'next/link'

import { getAbility } from '@/auth/auth'

import { LogoSvg } from '../svg/logo'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'

export async function Header() {
  const { permissions } = await getAbility()

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <LogoSvg />
        </Link>

        <Slash className="size-3 -rotate-[24deg] text-border" />
        <OrganizationSwitcher />
        <ProjectSwitcher permissions={permissions} />
      </div>
      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
