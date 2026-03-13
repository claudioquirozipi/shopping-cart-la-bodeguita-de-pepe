'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useBusiness } from '@/context/BusinessContext'

export default function Header() {
  const { itemCount, toggleCart } = useCart()
  const business = useBusiness()

  return (
    <header className="sticky top-0 z-40 bg-[#F9F9F7] shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {business?.logo ? (
            <Image
              src={business.logo}
              alt={business.name}
              width={48}
              height={48}
              className="rounded-xl object-contain"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[#2D5A27] flex items-center justify-center text-white font-bold text-lg">
              {business?.name?.[0] ?? 'S'}
            </div>
          )}
          <div>
            <h1 className="font-heading font-bold text-lg leading-tight text-[#1A1A1A]">
              {business?.name ?? 'Cargando...'}
            </h1>
            <p className="font-label text-xs text-[#757575]">Lista de Precios</p>
          </div>
        </div>

        <button
          onClick={toggleCart}
          className="relative flex items-center gap-2 bg-[#2D5A27] hover:bg-[#1E3D1A] text-white font-semibold px-4 py-2 rounded-xl transition-colors shadow"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span>Carrito</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-[#2D5A27] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
