'use server'

import { z } from 'zod'
import { actionClient } from '@/lib/safe-action'
import { createOfferTypeApi, getOfferTypes as getOfferTypesApi, updateOfferTypeApi, deleteOfferTypeApi } from '@/services/offer-type-service'

const offerTypeSchema = z.object({
  offerType: z.string().min(1, 'Offer type is required'),
  threshold: z.number().nullable().optional(),
  promoTypeDesc: z.string().nullable().optional(),
  promoMechanicDesc: z.string().nullable().optional(),
  rewardMechanicType: z.string().nullable().optional(),
})

export const createOfferType = actionClient.schema(offerTypeSchema).action(async ({ parsedInput }) => {
  try {
    const result = await createOfferTypeApi(parsedInput)
    return { success: true, data: result }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create offer type')
  }
})

export const updateOfferType = actionClient.schema(offerTypeSchema).action(async ({ parsedInput }) => {
  try {
    const result = await updateOfferTypeApi(parsedInput)
    return { success: true, data: result }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update offer type')
  }
})

export const deleteOfferType = actionClient
  .schema(z.object({ offerType: z.string() }))
  .action(async ({ parsedInput }) => {
    try {
      await deleteOfferTypeApi(parsedInput.offerType)
      return { success: true }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete offer type')
    }
  })

export async function getOfferTypes() {
  try {
    return await getOfferTypesApi()
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch offer types')
  }
}
