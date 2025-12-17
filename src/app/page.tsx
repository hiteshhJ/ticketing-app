import React from 'react'
import { Metadata } from 'next'
import { Display4, Display6, Box } from '@sainsburys-tech/fable'

export const metadata: Metadata = {
  title: 'Home | Ticketing',
}

const Home = () => (
  <>
    <Display4 as="h1" style={{ marginBottom: '20px' }}>
      Welcome to Ticketing!
    </Display4>

    <Box style={{ maxWidth: '900px', lineHeight: '1.6' }}>
      <Display6 as="h2" style={{ marginTop: '30px', marginBottom: '15px' }}>
        Our Mission
      </Display6>
      <p style={{ marginBottom: '20px' }}>
        We ensure the ticketing process runs seamlessly across Sainsbury's and Argos stores while modernising the architecture behind it. 
        We're focused on building a future-ready foundation that supports accurate pricing, operational efficiency, and customer trust.
      </p>

      <Display6 as="h2" style={{ marginTop: '30px', marginBottom: '15px' }}>
        What We Do
      </Display6>
      <p style={{ marginBottom: '20px' }}>
        Ticketing is critical for price accuracy and customer trust. We manage the creation and printing of Shelf Edge Labels (SELs) 
        and Electronic Shelf Edge Labels (ESELs) that display essential information including prices, promotions, product details, 
        and planogram information across stores.
      </p>

      <Display6 as="h2" style={{ marginTop: '30px', marginBottom: '15px' }}>
        Why It Matters
      </Display6>
      <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
        <li><strong>Legal Compliance</strong> – Ensures accurate pricing for legal trading requirements</li>
        <li><strong>Customer Trust</strong> – Provides shoppers with clear, correct pricing information</li>
        <li><strong>Operational Efficiency</strong> – Delivers timely and accurate labels to avoid manual fixes and delays</li>
      </ul>

      <p style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <strong>Team Motto:</strong> Keeping ticketing accurate today, building agility for tomorrow
      </p>
    </Box>
  </>
)

export default Home
