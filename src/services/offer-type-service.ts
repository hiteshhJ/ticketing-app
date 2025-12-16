import config from '@/config'
import type { OfferType } from '@/types/offer-type'

export async function createOfferTypeApi(offerType: OfferType): Promise<OfferType> {
  const authHeader = 'Basic ' + btoa('username:password')
  const response = await fetch(`${config.API_BASE_URL}/api/v1/offerType`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    body: JSON.stringify(offerType),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create offer type' }))
    throw new Error(error.message || 'Failed to create offer type')
  }

  return response.json()
}

export async function getOfferTypes(): Promise<OfferType[]> {
  const authHeader = 'Basic ' + btoa('username:password')
  const response = await fetch(`${config.API_BASE_URL}/api/v1/offerType`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch offer types')
  }

  return response.json()
}
