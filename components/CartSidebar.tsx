'use client'

import { useCart } from '@/context/CartContext'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

export default function CartSidebar() {
  const { items, isOpen, toggleCart } = useCart()

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={toggleCart} />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-heading font-bold text-lg text-[#212121]">Tu Carrito</h2>
          <button
            onClick={toggleCart}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#757575] hover:text-[#212121] hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#757575] gap-3">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="font-body text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.code} item={item} />)
          )}
        </div>

        <div className="px-5 py-4">
          <CartSummary />
        </div>
      </aside>
    </>
  )
}
