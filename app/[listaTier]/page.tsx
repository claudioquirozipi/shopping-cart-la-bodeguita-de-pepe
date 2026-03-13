export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { fetchBusiness } from '@/lib/api'
import { BusinessProvider } from '@/context/BusinessContext'
import Header from '@/components/Header'
import ShopClient from '@/components/ShopClient'

interface Props {
  params: Promise<{ listaTier: string }>
  searchParams: Promise<{ priceListId?: string }>
}

const ROUTES: Record<string, string> = {
  'precios-base': 'Precios Base',
  'tarifa-vip': 'Tarifa VIP',
}

export default async function TierPage({ params, searchParams }: Props) {
  const { listaTier } = await params
  const label = ROUTES[listaTier]
  if (!label) notFound()

  const { priceListId: priceListIdParam } = await searchParams
  const priceListId = priceListIdParam ? Number(priceListIdParam) : undefined

  const business = await fetchBusiness().catch(() => null)

  return (
    <BusinessProvider business={business}>
      <div className="min-h-screen bg-[#F9F9F9]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-4">
            <h2 className="font-heading font-semibold text-[#212121]">
              Catálogo — {label}
            </h2>
          </div>
          <ShopClient priceListId={priceListId} />
        </main>
      </div>
    </BusinessProvider>
  )
}
