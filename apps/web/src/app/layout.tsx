import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Turbo',
    default: 'Turbo',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}
