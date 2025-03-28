'use client'

import { AlertTriangle, LoaderCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { createOrganizationAction, updateOrganizationAction } from './actions'
import type { OrganizationSchema } from './schema/organization-schema'

interface OrganizationFormProps {
  isUpdating?: boolean
  initialData?: OrganizationSchema
}

export function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationFormProps) {
  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(formAction)

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Organization in failed!</AlertTitle>
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
          <Label htmlFor="name">Organization name</Label>
          <Input id="name" name="name" defaultValue={initialData?.name} />
          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.name[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="domain">E-mail domain</Label>
          <Input
            id="domain"
            name="domain"
            type="text"
            inputMode="url"
            placeholder="example.com"
            defaultValue={initialData?.domain ?? undefined}
          />
          {errors?.domain && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.domain[0]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <div className="translate-y-0.5">
              <Checkbox
                name="shouldAttachUsersByDomain"
                id="shouldAttachUsersByDomain"
                defaultChecked={initialData?.shouldAttachUsersByDomain}
              />
            </div>
            <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
              <span className="text-sm font-medium leading-none">
                Auto-join new members
              </span>
              <p className="text-sm text-muted-foreground">
                This will automatically invite all members with same e-mail
                domain to this organization.
              </p>
            </label>
          </div>
          {errors?.shouldAttachUsersByDomain && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors?.shouldAttachUsersByDomain[0]}
            </p>
          )}
        </div>
        <div className="space-y-3">
          <Button type="submit" className="w-full">
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              'Save organization'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
