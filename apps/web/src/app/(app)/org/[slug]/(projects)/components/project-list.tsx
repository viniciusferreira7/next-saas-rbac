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

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Project 01</CardTitle>
          <CardDescription className="line-clamp-3 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eaque
            quae magnam ut asperiores modi, fugit quaerat suscipit error
            molestias illum quo recusandae architecto velit eligendi debitis?
            Alias, dignissimos quasi!
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarFallback className="text-xs">P</AvatarFallback>
            <AvatarImage />
          </Avatar>
          <span className="text-sm text-muted-foreground">
            Created by{' '}
            <span className="font-medium text-foreground">John Doe</span> a day
            ago
          </span>
          <Button size="xs" variant="outline" className="ml-auto">
            View
            <ArrowRight className="ml-2 size-3 shrink-0" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
