'use client'

import { useState, useEffect } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { Box, Button, Alert } from '@sainsburys-tech/fable'
import { InfoCircle, CheckCircle } from '@sainsburys-tech/icons'
import { updateOfferType, deleteOfferType } from '@/actions/offer-type'
import type { OfferType } from '@/types/offer-type'

const BORDER_STYLE = '1px solid #d1d5db'

interface OfferTypeDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  offerType: OfferType | null
}

export default function OfferTypeDetailsModal({
  isOpen,
  onClose,
  onSuccess,
  offerType,
}: OfferTypeDetailsModalProps) {
  const [formData, setFormData] = useState<OfferType | null>(offerType)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    setFormData(offerType)
    setShowDeleteConfirm(false)
  }, [offerType])

  const {
    executeAsync: executeUpdate,
    hasSucceeded: updateSucceeded,
    hasErrored: updateErrored,
    result: updateResult,
    isExecuting: isUpdating,
    reset: resetUpdate,
  } = useAction(updateOfferType, {
    onSuccess: () => {
      onSuccess()
      setTimeout(() => { onClose(); }, 1500)
    },
  })

  const {
    executeAsync: executeDelete,
    hasSucceeded: deleteSucceeded,
    hasErrored: deleteErrored,
    result: deleteResult,
    isExecuting: isDeleting,
    reset: resetDelete,
  } = useAction(deleteOfferType, {
    onSuccess: () => {
      onSuccess()
      setTimeout(() => { onClose(); }, 1500)
    },
  })

  // Reset action states when dialog opens
  useEffect(() => {
    if (isOpen) {
      resetUpdate()
      resetDelete()
    }
  }, [isOpen, resetUpdate, resetDelete])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData) {
      await executeUpdate(formData)
    }
  }

  const handleDelete = async () => {
    if (formData) {
      await executeDelete({ offerType: formData.offerType })
    }
  }

  const handleClose = () => {
    setShowDeleteConfirm(false)
    resetUpdate()
    resetDelete()
    onClose()
  }

  if (!isOpen || !formData) return null

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
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          border: BORDER_STYLE,
          width: '90%',
          maxWidth: '500px',
          minWidth: '320px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation()
        }}
      >
        {/* Header */}
        <Box style={{ padding: '16px 20px', borderBottom: BORDER_STYLE }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Offer Type Details</h2>
        </Box>

        {/* Body */}
        <Box style={{ padding: '20px' }}>
          {updateSucceeded && (
            <Alert
              status="success"
              label="Offer type updated successfully"
              leadingIcon={<CheckCircle />}
              style={{ marginBottom: '12px' }}
            />
          )}

          {updateErrored && (
            <Alert
              status="error"
              label={updateResult.serverError || 'Failed to update offer type'}
              leadingIcon={<InfoCircle />}
              style={{ marginBottom: '12px' }}
            />
          )}

          {deleteSucceeded && (
            <Alert
              status="success"
              label="Offer type deleted successfully"
              leadingIcon={<CheckCircle />}
              style={{ marginBottom: '12px' }}
            />
          )}

          {deleteErrored && (
            <Alert
              status="error"
              label={deleteResult.serverError || 'Failed to delete offer type'}
              leadingIcon={<InfoCircle />}
              style={{ marginBottom: '12px' }}
            />
          )}

          {showDeleteConfirm ? (
            <Alert
              status="warning"
              label={`Are you sure you want to delete offer type "${formData.offerType}"? This action cannot be undone.`}
            />
          ) : (
            <form onSubmit={handleUpdate} id="offer-type-details-form">
              <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Box>
                  <label
                    htmlFor="offerType"
                    style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600', color: '#374151' }}
                  >
                    Offer Type *
                  </label>
                  <input
                    id="offerType"
                    type="text"
                    value={formData.offerType}
                    disabled
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: BORDER_STYLE,
                      borderRadius: '4px',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                    }}
                  />
                </Box>

                <Box>
                  <label
                    htmlFor="threshold"
                    style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600', color: '#374151' }}
                  >
                    Threshold
                  </label>
                  <input
                    id="threshold"
                    type="number"
                    value={formData.threshold}
                    onChange={(e) => {
                      setFormData({ ...formData, threshold: Number(e.target.value) })
                    }}
                    style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: BORDER_STYLE, borderRadius: '4px' }}
                  />
                </Box>
              </Box>

              <Box style={{ marginTop: '12px' }}>
                <label
                  htmlFor="promoTypeDesc"
                  style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600', color: '#374151' }}
                >
                  Promo Type Description
                </label>
                <input
                  id="promoTypeDesc"
                  type="text"
                  value={formData.promoTypeDesc || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, promoTypeDesc: e.target.value })
                  }}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: BORDER_STYLE, borderRadius: '4px' }}
                />
              </Box>

              <Box style={{ marginTop: '12px' }}>
                <label
                  htmlFor="promoMechanicDesc"
                  style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600', color: '#374151' }}
                >
                  Promo Mechanic Description
                </label>
                <input
                  id="promoMechanicDesc"
                  type="text"
                  value={formData.promoMechanicDesc || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, promoMechanicDesc: e.target.value })
                  }}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: BORDER_STYLE, borderRadius: '4px' }}
                />
              </Box>

              <Box style={{ marginTop: '12px' }}>
                <label
                  htmlFor="rewardMechanicType"
                  style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600', color: '#374151' }}
                >
                  Reward Mechanic Type
                </label>
                <input
                  id="rewardMechanicType"
                  type="text"
                  value={formData.rewardMechanicType || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, rewardMechanicType: e.target.value })
                  }}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: BORDER_STYLE, borderRadius: '4px' }}
                />
              </Box>
            </form>
          )}
        </Box>

        {/* Footer */}
        <Box style={{ padding: '16px 20px', borderTop: BORDER_STYLE }}>
          {showDeleteConfirm ? (
            <Box style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => { setShowDeleteConfirm(false); }}
                disabled={isDeleting}
                style={{ flex: 1, minWidth: '120px' }}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="primary" 
                onClick={handleDelete} 
                disabled={isDeleting}
                style={{ flex: 1, minWidth: '120px' }}
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </Button>
            </Box>
          ) : (
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button 
                type="button" 
                variant="primary" 
                onClick={() => { setShowDeleteConfirm(true); }} 
                disabled={isUpdating}
                style={{ minWidth: '100px' }}
              >
                Delete
              </Button>
              <Box style={{ display: 'flex', gap: '12px' }}>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleClose} 
                  disabled={isUpdating}
                  style={{ minWidth: '100px' }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  form="offer-type-details-form" 
                  variant="primary" 
                  disabled={isUpdating}
                  style={{ minWidth: '100px' }}
                >
                  {isUpdating ? 'Updating...' : 'Update'}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}
