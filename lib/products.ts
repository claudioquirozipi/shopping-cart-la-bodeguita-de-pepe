import { fetchAllProducts, fetchPriceLists, ApiProduct } from './api'
import { Product } from '@/types'

const PRICE_LIST_NAME = process.env.NEXT_PUBLIC_PRICE_LIST_NAME || 'lista-1'

export async function getProducts(withPriceList = true): Promise<Product[]> {
  let priceListId: number | undefined

  if (withPriceList) {
    const priceLists = await fetchPriceLists()
    const priceList =
      priceLists.find((pl) => pl.name.toLowerCase() === PRICE_LIST_NAME.toLowerCase()) ??
      priceLists[0]
    priceListId = priceList?.id
  }

  const apiProducts = await fetchAllProducts(priceListId)

  return apiProducts.map((p: ApiProduct): Product => ({
    id: p.id,
    code: p.code,
    description: p.name,
    basePrice: Number(p.price),
    price: p.listPrice !== undefined ? p.listPrice : Number(p.price),
    image: p.imageUrl ?? '',
    category: p.category.name,
  }))
}

export function getCategories(products: Product[]): string[] {
  const cats = Array.from(new Set(products.map((p) => p.category)))
  return cats.sort()
}
