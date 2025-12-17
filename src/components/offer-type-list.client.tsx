'use client'

import { useEffect, useState } from 'react'
import { Box, Alert, Button } from '@sainsburys-tech/fable'
import { InfoCircle } from '@sainsburys-tech/icons'
import { getOfferTypes } from '@/actions/offer-type'
import type { OfferType } from '@/types/offer-type'

interface OfferTypeListProps {
  refreshTrigger: number
  onRowClick: (offerType: OfferType) => void
}

export default function OfferTypeList({ refreshTrigger, onRowClick }: OfferTypeListProps) {
  const [allOfferTypes, setAllOfferTypes] = useState<OfferType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    const fetchOfferTypes = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getOfferTypes()
        // Sort offer types in ascending order by offerType field
        const sortedData = (data || []).sort((a, b) => {
          const aType = String(a.offerType).toLowerCase()
          const bType = String(b.offerType).toLowerCase()
          return aType.localeCompare(bType)
        })
        setAllOfferTypes(sortedData)
        setCurrentPage(0) // Reset to first page when data refreshes
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load offer types')
      } finally {
        setLoading(false)
      }
    }

    void fetchOfferTypes()
  }, [refreshTrigger])

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value))
    setCurrentPage(0) // Reset to first page when page size changes
  }

  // Client-side pagination
  const totalElements = allOfferTypes.length
  const totalPages = Math.ceil(totalElements / pageSize)
  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const offerTypes = allOfferTypes.slice(startIndex, endIndex)

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

  if (!offerTypes || offerTypes.length === 0) {
    return (
      <Box className="fable:text-center fable:p-4">
        <Alert status="info" label="No offer types found" leadingIcon={<InfoCircle />} />
      </Box>
    )
  }

  return (
    <Box className="fable:w-full">
      {/* Page Size Selector */}
      <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <label htmlFor="pageSize" style={{ fontSize: '11px', color: '#6b7280' }}>
          Show:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          style={{
            padding: '4px 8px',
            fontSize: '11px',
            border: '1px solid #d1d5db',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span style={{ fontSize: '11px', color: '#6b7280' }}>records per page</span>
      </Box>

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
            <tr
              key={index}
              className="fable:border-b fable:border-solid hover:fable:bg-gray-50 fable:cursor-pointer"
              onClick={() => onRowClick(offerType)}
            >
              <td className="fable:p-2">{offerType.offerType}</td>
              <td className="fable:p-2">{offerType.threshold}</td>
              <td className="fable:p-2">{offerType.promoTypeDesc}</td>
              <td className="fable:p-2">{offerType.promoMechanicDesc}</td>
              <td className="fable:p-2">{offerType.rewardMechanicType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px', padding: '10px' }}>
          <Button 
            variant="secondary" 
            onClick={handlePreviousPage} 
            disabled={currentPage === 0}
            style={{ fontSize: '11px', padding: '4px 8px' }}
          >
            Previous
          </Button>
          
          <Box style={{ display: 'flex', gap: '5px' }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageClick(i)}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  border: '1px solid #d1d5db',
                  borderRadius: '3px',
                  backgroundColor: currentPage === i ? '#2563eb' : '#ffffff',
                  color: currentPage === i ? '#ffffff' : '#000000',
                  cursor: 'pointer',
                }}
              >
                {i + 1}
              </button>
            ))}
          </Box>

          <Button 
            variant="secondary" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages - 1}
            style={{ fontSize: '11px', padding: '4px 8px' }}
          >
            Next
          </Button>

          <span style={{ fontSize: '11px', color: '#6b7280' }}>
            Page {currentPage + 1} of {totalPages} ({totalElements} total)
          </span>
        </Box>
      )}
    </Box>
  )
}
