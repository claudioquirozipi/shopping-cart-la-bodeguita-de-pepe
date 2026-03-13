export const dynamic = 'force-dynamic'

import { fetchBusiness } from '@/lib/api'
import { BusinessProvider } from '@/context/BusinessContext'
import Header from '@/components/Header'
import ShopClient from '@/components/ShopClient'

export default async function Home() {
  const business = await fetchBusiness()

  return (
    <BusinessProvider business={business}>
      <div className="min-h-screen bg-[#F9F9F9]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <ShopClient />
        </main>
      </div>
    </BusinessProvider>
  )
}
