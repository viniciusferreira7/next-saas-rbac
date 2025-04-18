import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'

export default function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  return (
    <>
      <div className="space-y-4 py-4">
        <Header />
        <Tabs />
        <main className="mx-auto h-full max-w-[1200px]">{children}</main>
      </div>
      {sheet}
    </>
  )
}
