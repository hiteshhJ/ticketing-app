'use server'

import { z } from 'zod'
import { actionClient } from '@/lib/safe-action'
import { createOfferTypeApi, getOfferTypes as getOfferTypesApi } from '@/services/offer-type-service'

const offerTypeSchema = z.object({
  offerType: z.string().min(1, 'Offer type is required'),
  threshold: z.number().min(0, 'Threshold must be non-negative'),
  promoTypeDesc: z.string().min(1, 'Promo type description is required'),
  promoMechanicDesc: z.string().min(1, 'Promo mechanic description is required'),
  rewardMechanicType: z.string().min(1, 'Reward mechanic type is required'),
})

export const createOfferType = actionClient.schema(offerTypeSchema).action(async ({ parsedInput }) => {
  try {
    const result = await createOfferTypeApi(parsedInput)
    return { success: true, data: result }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create offer type')
  }
})

export async function getOfferTypes() {
  try {
    return await getOfferTypesApi()
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch offer types')
  }
}
