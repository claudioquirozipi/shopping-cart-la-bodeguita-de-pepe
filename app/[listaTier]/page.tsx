export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { fetchPriceLists, fetchBusiness } from '@/lib/api'
import { BusinessProvider } from '@/context/BusinessContext'
import Header from '@/components/Header'
import ShopClient from '@/components/ShopClient'

interface Props {
  params: Promise<{ listaTier: string }>
}

const ROUTES: Record<string, { withPriceList: boolean; label: string }> = {
  'precios-base': { withPriceList: false, label: 'Precios Base' },
  'tarifa-vip':   { withPriceList: true,  label: 'Tarifa VIP'  },
}

const PRICE_LIST_NAME = process.env.NEXT_PUBLIC_PRICE_LIST_NAME || 'lista-1'

export default async function TierPage({ params }: Props) {
  const { listaTier } = await params
  const route = ROUTES[listaTier]
  if (!route) notFound()

  let priceListId: number | undefined

  const [priceLists, business] = await Promise.all([
    route.withPriceList ? fetchPriceLists() : Promise.resolve([]),
    fetchBusiness(),
  ])

  if (route.withPriceList && priceLists.length > 0) {
    const found = priceLists.find(
      (pl) => pl.name.toLowerCase() === PRICE_LIST_NAME.toLowerCase(),
    )
    priceListId = found?.id ?? priceLists[0]?.id
  }

  return (
    <BusinessProvider business={business}>
      <div className="min-h-screen bg-[#F9F9F9]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-4">
            <h2 className="font-heading font-semibold text-[#212121]">
              Catálogo — {route.label}
            </h2>
          </div>
          <ShopClient priceListId={priceListId} />
        </main>
      </div>
    </BusinessProvider>
  )
}
