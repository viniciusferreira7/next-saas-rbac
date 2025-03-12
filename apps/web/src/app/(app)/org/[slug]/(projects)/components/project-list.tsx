import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProjects } from '@/http/get-projects'

dayjs.extend(relativeTime)

interface ProjectListProps {
  orgSlug: string
}

export async function ProjectList({ orgSlug }: ProjectListProps) {
  const { projects } = await getProjects({
    orgSlug,
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      {projects?.map((project) => {
        return (
          <Card key={project.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {project.name}
              </CardTitle>
              <CardDescription className="line-clamp-3 leading-relaxed">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center gap-1.5">
              <Avatar className="size-4">
                <AvatarFallback className="text-xs">
                  {project.name.charAt(0).toUpperCase()}
                </AvatarFallback>
                {project.owner.avatarUrl && (
                  <AvatarImage src={project.owner.avatarUrl} />
                )}
              </Avatar>
              <span className="truncate text-sm text-muted-foreground">
                <span className="truncate font-medium text-foreground">
                  {project.owner.name}
                </span>{' '}
                {dayjs(project.createdAt).fromNow()}
              </span>
              <Button size="xs" variant="outline" className="ml-auto">
                View
                <ArrowRight className="ml-2 size-3 shrink-0" />
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
