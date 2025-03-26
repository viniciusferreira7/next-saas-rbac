import './globals.css'

import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'

import { Providers } from './providers'

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  )
}
