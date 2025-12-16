'use server'

import { z } from 'zod'
import { actionClient } from '@/lib/safe-action'

// This schema is used to validate input from client.
const schema = z.object({
  value: z.number().min(0).max(5),
})

export const saveCounterValue = actionClient.schema(schema).action(async ({ parsedInput: { value } }) => {
  /* eslint-disable no-console */
  console.log('Saving counter value server side', value)
  /* eslint-enable no-console */
  return Promise.resolve({ value })
})
