import { type FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface FormState {
  success: boolean
  message: null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  async function handleAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success && onSuccess) {
        await onSuccess()
      }

      setFormState(state)
    })

    startTransition(() => {
      requestFormReset(form)
    })
  }

  return [formState, handleAction, isPending] as const
}
