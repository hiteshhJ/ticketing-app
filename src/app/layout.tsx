import type { Metadata, Viewport } from 'next'
import { Container } from '@sainsburys-tech/fable'
import { StylesManager } from '@sainsburys-tech/nextjs-support'

import '@/global.css'

import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'Ticketing v3.0.0',
}

// recommended for mobile apps so that the user does not zoom
// NOT for desktop apps
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StylesManager>
          <Header />
          <Container id="maincontent" size="lg">
            {children}
          </Container>
        </StylesManager>
      </body>
    </html>
  )
}
