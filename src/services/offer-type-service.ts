import config from '@/config'
import type { OfferType } from '@/types/offer-type'

const AUTH_HEADER = 'Basic ' + btoa('username:password')

export async function createOfferTypeApi(offerType: OfferType): Promise<OfferType> {
  const authHeader = AUTH_HEADER
  const response = await fetch(`${config.API_BASE_URL}/api/v1/offerType`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    body: JSON.stringify(offerType),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create offer type' })) as { message: string }
    throw new Error(error.message || 'Failed to create offer type')
  }

  return response.json() as Promise<OfferType>
}

export async function getOfferTypes(): Promise<OfferType[]> {
  const authHeader = AUTH_HEADER
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

  const data = await response.json() as OfferType[]
  return Array.isArray(data) ? data : []
}

export async function updateOfferTypeApi(offerType: OfferType): Promise<OfferType> {
  const authHeader = AUTH_HEADER
  const response = await fetch(`${config.API_BASE_URL}/api/v1/offerType`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    body: JSON.stringify(offerType),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to update offer type' })) as { message: string }
    throw new Error(error.message || 'Failed to update offer type')
  }

  return response.json() as Promise<OfferType>
}

export async function deleteOfferTypeApi(offerTypeId: string): Promise<void> {
  const authHeader = AUTH_HEADER
  const response = await fetch(`${config.API_BASE_URL}/api/v1/offerType?offerTypeCode=${encodeURIComponent(offerTypeId)}`, {
    method: 'DELETE',
    headers: {
      'Authorization': authHeader,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to delete offer type' })) as { message: string }
    throw new Error(error.message || 'Failed to delete offer type')
  }
}
