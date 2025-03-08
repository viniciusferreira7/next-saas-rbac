'use client'

import { AlertTriangle, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './actions'

export function ProjectForm() {
  const { org } = useParams<{ org: string }>()
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createProjectAction,
    () => {
      queryClient.invalidateQueries({ queryKey: [{ org }, 'get', 'projects'] })
    },
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Project in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}
        {success === true && message && (
          <Alert variant="success">
            <AlertTriangle className="size-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="name">Project name</Label>
          <Input id="name" name="name" />
          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.name[0]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" />
          {errors?.description && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.description[0]}
            </p>
          )}
        </div>
        <div className="space-y-3">
          <Button type="submit" className="w-full">
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              'Save project'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
