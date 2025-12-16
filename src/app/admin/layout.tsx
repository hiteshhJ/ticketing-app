import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Ticketing',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
