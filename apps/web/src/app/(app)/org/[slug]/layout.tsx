type OrgLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function OrgLayout({ children }: OrgLayoutProps) {
  return <>{children}</>
}
