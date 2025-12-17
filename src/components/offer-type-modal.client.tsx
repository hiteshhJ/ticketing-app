'use client'

import { useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import {
  Box,
  Button,
  Alert,
} from '@sainsburys-tech/fable'
import { InfoCircle, CheckCircle } from '@sainsburys-tech/icons'
import { createOfferType } from '@/actions/offer-type'

interface OfferTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function OfferTypeModal({ isOpen, onClose, onSuccess }: OfferTypeModalProps) {
  const inputStyle = { width: '100%', padding: '3px 5px', fontSize: '11px', border: '1px solid #d1d5db', borderRadius: '3px' }
  
  const [formData, setFormData] = useState({
    offerType: '',
    threshold: '',
    promoTypeDesc: '',
    promoMechanicDesc: '',
    rewardMechanicType: '',
  })

  const { executeAsync, hasErrored, hasSucceeded, result, reset, isExecuting } = useAction(createOfferType, {
    onSuccess: () => {
      handleReset()
      onSuccess()
      setTimeout(() => {
        onClose()
      }, 1500)
    },
  })

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

  const handleClose = () => {
    handleReset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={handleClose}
    >
      <Box 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '2px solid #d1d5db',
          maxWidth: '450px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e: React.MouseEvent) => { e.stopPropagation(); }}
      >
        {/* Header */}
        <Box style={{ padding: '6px 10px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Create Offer Type</h2>
        </Box>

        {/* Body */}
        <Box style={{ padding: '6px 10px' }}>
          {hasSucceeded && (
            <Alert
              status="success"
              label="Offer type created successfully"
              leadingIcon={<CheckCircle />}
              style={{ marginBottom: '4px', fontSize: '10px' }}
            />
          )}

          {hasErrored && (
            <Alert
              status="error"
              label={result.serverError || 'Failed to create offer type'}
              leadingIcon={<InfoCircle />}
              style={{ marginBottom: '4px', fontSize: '10px' }}
            />
          )}

          <form onSubmit={handleSubmit} id="offer-type-form">
            <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              <Box>
                <label htmlFor="offerType" style={{ display: 'block', marginBottom: '1px', fontSize: '10px', fontWeight: '600' }}>
                  Offer Type *
                </label>
                <input
                  id="offerType"
                  type="number"
                  value={formData.offerType}
                  onChange={(e) => { setFormData({ ...formData, offerType: e.target.value }); }}
                  required
                  style={inputStyle}
                />
              </Box>

              <Box>
                <label htmlFor="threshold" style={{ display: 'block', marginBottom: '1px', fontSize: '10px', fontWeight: '600' }}>
                  Threshold
                </label>
                <input
                  id="threshold"
                  type="number"
                  value={formData.threshold}
                  onChange={(e) => { setFormData({ ...formData, threshold: e.target.value }); }}
                  style={inputStyle}
                />
              </Box>
            </Box>

            <Box style={{ marginTop: '4px' }}>
              <label htmlFor="promoTypeDesc" style={{ display: 'block', marginBottom: '1px', fontSize: '10px', fontWeight: '600' }}>
                Promo Type Description
              </label>
              <input
                id="promoTypeDesc"
                type="text"
                value={formData.promoTypeDesc}
                onChange={(e) => { setFormData({ ...formData, promoTypeDesc: e.target.value }); }}
                style={inputStyle}
              />
            </Box>

            <Box style={{ marginTop: '4px' }}>
              <label htmlFor="promoMechanicDesc" style={{ display: 'block', marginBottom: '1px', fontSize: '10px', fontWeight: '600' }}>
                Promo Mechanic Description
              </label>
              <input
                id="promoMechanicDesc"
                type="text"
                value={formData.promoMechanicDesc}
                onChange={(e) => { setFormData({ ...formData, promoMechanicDesc: e.target.value }); }}
                style={inputStyle}
              />
            </Box>

            <Box style={{ marginTop: '4px' }}>
              <label htmlFor="rewardMechanicType" style={{ display: 'block', marginBottom: '1px', fontSize: '10px', fontWeight: '600' }}>
                Reward Mechanic Type
              </label>
              <input
                id="rewardMechanicType"
                type="text"
                value={formData.rewardMechanicType}
                onChange={(e) => { setFormData({ ...formData, rewardMechanicType: e.target.value }); }}
                style={inputStyle}
              />
            </Box>

            <Box style={{ marginTop: '4px' }}>
              <Alert
                status="info"
                label="Please contact support for adding threshold offer types"
                leadingIcon={<InfoCircle />}
                style={{ fontSize: '9px' }}
              />
            </Box>
          </form>
        </Box>

        {/* Footer */}
        <Box style={{ padding: '5px 10px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isExecuting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" form="offer-type-form" disabled={isExecuting}>
            {isExecuting ? 'Creating...' : 'Create'}
          </Button>
        </Box>
      </Box>
    </div>
  )
}
