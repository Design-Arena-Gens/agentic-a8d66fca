import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instagram Growth Secrets - Influencer Talk',
  description: 'Learn the secrets to Instagram growth from a top influencer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
