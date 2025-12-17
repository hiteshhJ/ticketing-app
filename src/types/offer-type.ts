export interface OfferType {
  id?: string
  offerType: string
  threshold?: number | null
  promoTypeDesc?: string | null
  promoMechanicDesc?: string | null
  rewardMechanicType?: string | null
  createdDateTime?: string
  lastUpdatedDateTime?: string
  version?: number
}

export interface PaginatedOfferTypes {
  content: OfferType[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}
