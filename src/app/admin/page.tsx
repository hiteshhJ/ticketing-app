'use client'

import { useState } from 'react'
import { Display6, Display3, Button, Box } from '@sainsburys-tech/fable'
import OfferTypeList from '@/components/offer-type-list.client'
import OfferTypeModal from '@/components/offer-type-modal.client'
import OfferTypeDetailsModal from '@/components/offer-type-details-modal.client'
import type { OfferType } from '@/types/offer-type'

export default function AdminPage() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedOfferType, setSelectedOfferType] = useState<OfferType | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false)
  }

  const handleRowClick = (offerType: OfferType) => {
    setSelectedOfferType(offerType)
    setDetailsModalOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false)
    setSelectedOfferType(null)
  }

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <>
      <Display6 as="h1">Offer Type Management</Display6>
      <Display3 as="p" className="fable:font-bold">
        Manage your promotional offer types
      </Display3>
      <p>
        Create, view, update, and delete offer types. Click on any row to view details and make changes.
      </p>
      
      <Box style={{ marginTop: '20px', marginBottom: '15px' }}>
        <Button variant="primary" onClick={handleOpenCreateModal}>
          + Create Offer Type
        </Button>
      </Box>

      <Box backgroundColor="secondary" style={{ padding: '20px' }}>
        <OfferTypeList refreshTrigger={refreshTrigger} onRowClick={handleRowClick} />
      </Box>

      <OfferTypeModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} onSuccess={handleSuccess} />

      <OfferTypeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        onSuccess={handleSuccess}
        offerType={selectedOfferType}
      />
    </>
  )
}
