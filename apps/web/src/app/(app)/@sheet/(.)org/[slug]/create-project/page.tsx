import type { Metadata } from 'next'

import { ProjectForm } from '@/app/(app)/org/[slug]/create-project/project-form'
import { getCurrentOrg } from '@/auth/auth'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { getOrganization } from '@/http/get-organization'

export async function generateMetadata(): Promise<Metadata> {
  const { currentOrg } = await getCurrentOrg()

  const { organization } = await getOrganization({
    org: currentOrg!,
  })

  return {
    title: `Creste project - ${organization.name}`,
  }
}

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>
        <ProjectForm />
      </InterceptedSheetContent>
    </Sheet>
  )
}
