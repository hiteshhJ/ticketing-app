'use client'

import { useState } from 'react'
import { Display6, Button, Box } from '@sainsburys-tech/fable'
import OfferTypeList from '@/components/offer-type-list.client'
import OfferTypeModal from '@/components/offer-type-modal.client'

export default function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <>
      <Box className="fable:flex fable:justify-between fable:items-center fable:mb-2">
        <Display6 as="h1">Admin - Offer Type Management</Display6>
        <Button variant="primary" onClick={handleOpenModal}>
          + Create Offer Type
        </Button>
      </Box>

      <Box className="fable:flex fable:justify-center">
        <OfferTypeList refreshTrigger={refreshTrigger} />
      </Box>

      <OfferTypeModal isOpen={isModalOpen} onClose={handleCloseModal} onSuccess={handleSuccess} />
    </>
  )
}
