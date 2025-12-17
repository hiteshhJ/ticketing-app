export interface OfferType {
  offerType: string
  threshold: number
  promoTypeDesc: string
  promoMechanicDesc: string
  rewardMechanicType: string
}

export interface PaginatedOfferTypes {
  content: OfferType[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}
