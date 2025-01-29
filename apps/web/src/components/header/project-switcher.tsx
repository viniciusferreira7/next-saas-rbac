import type { AppAbility } from '@saas/auth'

interface ProjectSwitcherProps {
  permissions: AppAbility | null
}

export function ProjectSwitcher({ permissions }: ProjectSwitcherProps) {
  return <>{permissions?.can('get', 'Project') && <p>Projects</p>}</>
}
