'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow overflow-hidden">
      {/* Imagen */}
      <div className="relative w-full aspect-square bg-gray-50">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.description}
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex-1">
          <p className="font-label text-xs text-[#C5A059] uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <p className="font-body text-sm text-[#1A1A1A] leading-snug line-clamp-3">
            {product.description}
          </p>
          <p className="font-label text-xs text-[#757575] mt-1">Cód: {product.code}</p>
        </div>

        <div className="flex flex-col gap-1">
          {product.price !== product.basePrice ? (
            // Tiene precio VIP diferente al base
            <>
              <div className="flex items-center justify-between">
                <span className="font-label text-xs text-[#757575]">Precio base</span>
                <span className="font-body text-sm text-[#757575] line-through">
                  ${product.basePrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-label text-xs text-[#C5A059] font-semibold">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Tarifa VIP
                </span>
                <span className="font-heading font-bold text-lg text-[#C5A059]">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            // Sin precio VIP — solo muestra el precio base
            <div className="flex items-center justify-between">
              <span className="font-label text-xs text-[#757575]">Precio</span>
              <span className="font-heading font-bold text-lg text-[#1A1A1A]">
                ${product.basePrice.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => addItem(product)}
          className="bg-[#2D5A27] hover:bg-[#1E3D1A] text-white text-sm font-semibold px-4 py-1.5 rounded-xl transition-colors w-full"
        >
          Agregar
        </button>
      </div>
    </div>
  )
}
