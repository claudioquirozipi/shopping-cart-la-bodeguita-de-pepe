export const dynamic = 'force-dynamic'

import { getProducts, getCategories } from '@/lib/products'
import { fetchBusiness } from '@/lib/api'
import { BusinessProvider } from '@/context/BusinessContext'
import Header from '@/components/Header'
import ShopClient from '@/components/ShopClient'

export default async function Home() {
  const [products, business] = await Promise.all([
    getProducts(false),
    fetchBusiness(),
  ])
  const categories = getCategories(products)

  return (
    <BusinessProvider business={business}>
      <div className="min-h-screen bg-[#F9F9F9]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-4">
            <h2 className="font-heading font-semibold text-[#212121]">
              Catálogo de Productos
            </h2>
            <p className="font-body text-sm text-[#757575]">
              {products.length} productos disponibles
            </p>
          </div>
          <ShopClient products={products} categories={categories} />
        </main>
      </div>
    </BusinessProvider>
  )
}
