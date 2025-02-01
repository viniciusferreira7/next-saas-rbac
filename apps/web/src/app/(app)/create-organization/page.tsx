import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CreateOrganizationPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>
      <div className="space-y-4">
        <form className="space-y-4">
          {/* {!success && message && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Sign in failed!</AlertTitle>
              <AlertDescription>
                <p>{message}</p>
              </AlertDescription>
            </Alert>
          )} */}
          <div>
            <Label htmlFor="name">Organization name</Label>
            <Input id="name" name="name" />
            {/* {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors?.name[0]}
              </p>
            )} */}
          </div>
          <div>
            <Label htmlFor="domain">E-mail domain</Label>
            <Input
              id="domain"
              name="domain"
              type="text"
              inputMode="url"
              placeholder="example.com"
            />
            {/* {errors?.email && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors?.email[0]}
              </p>
            )} */}
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <div className="translate-y-0.5">
                <Checkbox
                  name="shouldAttachUsersByDomain"
                  id="shouldAttachUsersByDomain"
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
          </div>
          <Button type="submit" variant="outline" className="w-full">
            Save organization
          </Button>
        </form>
      </div>
    </div>
  )
}
