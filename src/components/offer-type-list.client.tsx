'use client'

import { useEffect, useState } from 'react'
import { Box, Alert } from '@sainsburys-tech/fable'
import { InfoCircle } from '@sainsburys-tech/icons'
import { getOfferTypes } from '@/actions/offer-type'
import type { OfferType } from '@/types/offer-type'

export default function OfferTypeList({ refreshTrigger }: { refreshTrigger: number }) {
  const [offerTypes, setOfferTypes] = useState<OfferType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOfferTypes = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getOfferTypes()
        setOfferTypes(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load offer types')
      } finally {
        setLoading(false)
      }
    }

    void fetchOfferTypes()
  }, [refreshTrigger])

  if (loading) {
    return (
      <Box className="fable:flex fable:justify-center fable:p-4">
        <div>Loading...</div>
      </Box>
    )
  }

  if (error) {
    return <Alert status="error" label={error} leadingIcon={<InfoCircle />} />
  }

  if (offerTypes.length === 0) {
    return (
      <Box className="fable:text-center fable:p-4">
        <Alert status="info" label="No offer types found" leadingIcon={<InfoCircle />} />
      </Box>
    )
  }

  return (
    <Box className="fable:w-full">
      <table className="fable:w-full fable:border-collapse">
        <thead>
          <tr className="fable:border-b fable:border-solid">
            <th className="fable:text-left fable:p-2 fable:bg-gray-100">Offer Type</th>
            <th className="fable:text-left fable:p-2 fable:bg-gray-100">Threshold</th>
            <th className="fable:text-left fable:p-2 fable:bg-gray-100">Promo Type Description</th>
            <th className="fable:text-left fable:p-2 fable:bg-gray-100">Promo Mechanic Description</th>
            <th className="fable:text-left fable:p-2 fable:bg-gray-100">Reward Mechanic Type</th>
          </tr>
        </thead>
        <tbody>
          {offerTypes.map((offerType, index) => (
            <tr key={index} className="fable:border-b fable:border-solid">
              <td className="fable:p-2">{offerType.offerType}</td>
              <td className="fable:p-2">{offerType.threshold}</td>
              <td className="fable:p-2">{offerType.promoTypeDesc}</td>
              <td className="fable:p-2">{offerType.promoMechanicDesc}</td>
              <td className="fable:p-2">{offerType.rewardMechanicType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  )
}
