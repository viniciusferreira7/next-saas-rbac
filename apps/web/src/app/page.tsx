import { auth } from '@/auth/auth'

export default async function HomePage() {
  const { user } = await auth()

  return <h1>{JSON.stringify(user)}</h1>
}
