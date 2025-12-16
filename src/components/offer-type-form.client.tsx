'use client'

import { useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import {
  Box,
  Button,
  Alert,
  Display3,
} from '@sainsburys-tech/fable'
import { InfoCircle, CheckCircle } from '@sainsburys-tech/icons'
import { createOfferType } from '@/actions/offer-type'

const REWARD_MECHANIC_TYPES = [
  'PERCENTAGE_DISCOUNT',
  'FIXED_AMOUNT_DISCOUNT',
  'FREE_ITEM',
  'POINTS',
] as const

export default function OfferTypeForm() {
  const [formData, setFormData] = useState({
    offerType: '',
    threshold: '',
    promoTypeDesc: '',
    promoMechanicDesc: '',
    rewardMechanicType: '',
  })

  const { executeAsync, hasErrored, hasSucceeded, result, reset } = useAction(createOfferType)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await executeAsync({
      offerType: formData.offerType,
      threshold: Number(formData.threshold),
      promoTypeDesc: formData.promoTypeDesc,
      promoMechanicDesc: formData.promoMechanicDesc,
      rewardMechanicType: formData.rewardMechanicType,
    })
  }

  const handleReset = () => {
    setFormData({
      offerType: '',
      threshold: '',
      promoTypeDesc: '',
      promoMechanicDesc: '',
      rewardMechanicType: '',
    })
    reset()
  }

  return (
    <Box backgroundColor="secondary" border={{ radius: 'sm', size: 'sm' }} className="fable:p-2">
      <Display3 as="h2">Create Offer Type</Display3>

      {hasSucceeded && (
        <Alert
          status="success"
          label="Offer type created successfully"
          leadingIcon={<CheckCircle />}
          className="fable:mb-1"
        />
      )}

      {hasErrored && (
        <Alert
          status="error"
          label={result?.serverError || 'Failed to create offer type'}
          leadingIcon={<InfoCircle />}
          className="fable:mb-1"
        />
      )}

      <form onSubmit={handleSubmit}>
        <Box className="fable:mb-1">
          <label htmlFor="offerType" className="fable:block fable:mb-0.5 fable:font-semibold">
            Offer Type *
          </label>
          <input
            id="offerType"
            type="text"
            value={formData.offerType}
            onChange={(e) => { setFormData({ ...formData, offerType: e.target.value }); }}
            required
            className="fable:w-full fable:p-1 fable:border fable:border-solid fable:rounded"
          />
        </Box>

        <Box className="fable:mb-1">
          <label htmlFor="threshold" className="fable:block fable:mb-0.5 fable:font-semibold">
            Threshold *
          </label>
          <input
            id="threshold"
            type="number"
            value={formData.threshold}
            onChange={(e) => { setFormData({ ...formData, threshold: e.target.value }); }}
            required
            className="fable:w-full fable:p-1 fable:border fable:border-solid fable:rounded"
          />
        </Box>

        <Box className="fable:mb-1">
          <label htmlFor="promoTypeDesc" className="fable:block fable:mb-0.5 fable:font-semibold">
            Promo Type Description *
          </label>
          <input
            id="promoTypeDesc"
            type="text"
            value={formData.promoTypeDesc}
            onChange={(e) => { setFormData({ ...formData, promoTypeDesc: e.target.value }); }}
            required
            className="fable:w-full fable:p-1 fable:border fable:border-solid fable:rounded"
          />
        </Box>

        <Box className="fable:mb-1">
          <label htmlFor="promoMechanicDesc" className="fable:block fable:mb-0.5 fable:font-semibold">
            Promo Mechanic Description *
          </label>
          <input
            id="promoMechanicDesc"
            type="text"
            value={formData.promoMechanicDesc}
            onChange={(e) => { setFormData({ ...formData, promoMechanicDesc: e.target.value }); }}
            required
            className="fable:w-full fable:p-1 fable:border fable:border-solid fable:rounded"
          />
        </Box>

        <Box className="fable:mb-1">
          <label htmlFor="rewardMechanicType" className="fable:block fable:mb-0.5 fable:font-semibold">
            Reward Mechanic Type *
          </label>
          <select
            id="rewardMechanicType"
            value={formData.rewardMechanicType}
            onChange={(e) => { setFormData({ ...formData, rewardMechanicType: e.target.value }); }}
            required
            className="fable:w-full fable:p-1 fable:border fable:border-solid fable:rounded"
          >
            <option value="">Select type...</option>
            {REWARD_MECHANIC_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </Box>

        <Box className="fable:mt-2">
          <Button type="submit" variant="primary" className="fable:mr-1">
            Create Offer Type
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </form>

      <Alert
        status="info"
        label="Please contact support for adding threshold offer types"
        leadingIcon={<InfoCircle />}
        className="fable:mt-2"
      />
    </Box>
  )
}
