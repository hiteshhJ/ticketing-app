import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Profile | Ticketing',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
