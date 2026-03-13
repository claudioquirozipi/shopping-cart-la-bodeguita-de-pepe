'use client'

import { useState, useEffect, useRef } from 'react'
import { Product } from '@/types'
import {
  ApiCategory,
  ApiProduct,
  fetchCategories,
  fetchProductsPage,
} from '@/lib/api'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import ProductGrid from '@/components/ProductGrid'
import CartSidebar from '@/components/CartSidebar'

const PAGE_SIZE = 20

interface ShopClientProps {
  priceListId?: number
}

function mapProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    code: p.code,
    description: p.name,
    basePrice: Number(p.price),
    price: p.listPrice !== undefined ? p.listPrice : Number(p.price),
    image: p.imageUrl ?? '',
    category: p.category.name,
  }
}

export default function ShopClient({ priceListId }: ShopClientProps) {
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  // Refs para evitar closures obsoletos en el IntersectionObserver
  const pageRef = useRef(0)
  const hasMoreRef = useRef(true)
  const loadingRef = useRef(false)
  const categoryIdRef = useRef<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  async function loadMore() {
    if (loadingRef.current || !hasMoreRef.current) return
    loadingRef.current = true
    setLoading(true)

    const nextPage = pageRef.current + 1
    const catId = categoryIdRef.current

    try {
      const data = await fetchProductsPage(
        nextPage,
        PAGE_SIZE,
        priceListId,
        catId ?? undefined,
      )
      const mapped = data.items.map(mapProduct)
      setProducts((prev) => (nextPage === 1 ? mapped : [...prev, ...mapped]))
      setTotal(data.total)
      pageRef.current = nextPage
      hasMoreRef.current = pageRef.current * PAGE_SIZE < data.total
    } catch (e) {
      console.error(e)
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }

  // Cargar categorías desde la API al montar
  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error)
  }, [])

  // Carga inicial de productos
  useEffect(() => {
    loadMore()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // IntersectionObserver estable (usa refs, no necesita re-registrarse)
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleCategorySelect(id: number | null) {
    categoryIdRef.current = id
    pageRef.current = 0
    hasMoreRef.current = true
    loadingRef.current = false
    setSelectedCategoryId(id)
    setProducts([])
    setTotal(0)
    setSearch('')
    setLoading(true)
    loadMore()
  }

  const filtered = search.trim()
    ? products.filter((p) =>
        p.description.toLowerCase().includes(search.toLowerCase()),
      )
    : products

  return (
    <>
      <div className="space-y-3 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={handleCategorySelect}
        />
      </div>

      {products.length === 0 && !loading ? (
        <div className="text-center py-16 text-[#757575] font-body">
          No se encontraron productos.
        </div>
      ) : (
        <>
          {total > 0 && (
            <p className="text-sm text-[#757575] font-body mb-4">
              {total} productos
            </p>
          )}
          <ProductGrid products={filtered} />
        </>
      )}

      <div ref={sentinelRef} className="h-4" />

      {loading && (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-2 border-[#2D5A27] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <CartSidebar />
    </>
  )
}
