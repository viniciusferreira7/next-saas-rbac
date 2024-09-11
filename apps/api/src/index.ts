import { defineAbilityFor, projectSchema } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' })

const userCanGetBilling = ability.can('get', 'Billing')
const userCanCreateInvite = ability.can('create', 'Invite')

const project = projectSchema.parse({ id: 'project-id', ownerId: 'user-id' })

const userCanDeleteProject = ability.can('delete', project)

console.log({
  userCanGetBilling,
  userCanCreateInvite,
  userCanDeleteProject,
})
