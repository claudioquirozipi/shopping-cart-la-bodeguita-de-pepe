const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'
const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || ''
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? ''  // temporalmente desactivada

const BASE_URL = `${API_URL}/${API_VERSION}/storefront`

function buildUrl(
  path: string,
  params: Record<string, string | number> = {},
): string {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('businessId', BUSINESS_ID)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value))
  }
  return url.toString()
}

function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    // 'x-api-key': API_KEY,  // temporalmente desactivada
  }
}

export interface ApiProduct {
  id: number
  code: string
  name: string
  description: string | null
  price: number
  listPrice?: number
  stock: number
  imageUrl: string | null
  hasVariants: boolean
  category: { id: number; name: string }
}

export interface ApiCategory {
  id: number
  name: string
  description: string | null
}

export interface ApiPriceList {
  id: number
  name: string
  isDefault: boolean
}

export interface ApiProductsResponse {
  items: ApiProduct[]
  total: number
  page: number
  limit: number
}

export async function fetchPriceLists(): Promise<ApiPriceList[]> {
  const res = await fetch(buildUrl('/price-lists'), {
    headers: getHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Error al obtener price lists: ${res.status}`)
  return res.json()
}

export async function fetchProductsPage(
  page: number,
  limit: number,
  priceListId?: number,
  categoryId?: number,
): Promise<ApiProductsResponse> {
  const params: Record<string, string | number> = { page, limit }
  if (priceListId !== undefined) params.priceListId = priceListId
  if (categoryId !== undefined) params.categoryId = categoryId

  const res = await fetch(buildUrl('/products', params), {
    headers: getHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Error al obtener productos: ${res.status}`)
  return res.json()
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await fetch(buildUrl('/categories'), {
    headers: getHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Error al obtener categorías: ${res.status}`)
  return res.json()
}

export async function fetchAllProducts(
  priceListId?: number,
): Promise<ApiProduct[]> {
  const limit = 100
  let page = 1
  const allItems: ApiProduct[] = []

  while (true) {
    const data = await fetchProductsPage(page, limit, priceListId)
    allItems.push(...data.items)
    if (allItems.length >= data.total || data.items.length < limit) break
    page++
  }

  return allItems
}

export interface ApiBusiness {
  name: string
  logo: string | null
  description: string | null
  phone: string | null
  email: string | null
  website: string | null
  currency: string | null
}

export async function fetchBusiness(): Promise<ApiBusiness> {
  const res = await fetch(buildUrl('/business'), {
    headers: getHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Error al obtener negocio: ${res.status}`)
  return res.json()
}
