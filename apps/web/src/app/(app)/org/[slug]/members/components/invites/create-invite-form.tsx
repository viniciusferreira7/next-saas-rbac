'use client'

import { AlertTriangle, LoaderCircle, UserPlus } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'

import { createInviteAction } from './actions'

export function CreateInviteForm() {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(createInviteAction)

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Invite failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}
        <div className="flex items-center gap-2">
          <div className="flex-1 space-y-1">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
            />
            {errors?.email && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors?.email[0]}
              </p>
            )}
          </div>
          <Select name="role" defaultValue="MEMBER">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MEMBER">Member</SelectItem>
              <SelectItem value="BILLING">Billing</SelectItem>
            </SelectContent>
          </Select>
          <div className="space-y-3">
            <Button type="submit">
              {isPending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <>
                  <UserPlus className="mr-2 size-4" />
                  Invite user
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
