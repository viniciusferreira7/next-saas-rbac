'use client'

import { AlertTriangle, LoaderCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'

import { createProjectAction } from './actions'

export function ProjectForm() {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(createProjectAction)

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
        <div>
          <Label htmlFor="name">Project name</Label>
          <Input id="name" name="name" />
          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.name[0]}
            </p>
          )}
        </div>
        <div>
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
