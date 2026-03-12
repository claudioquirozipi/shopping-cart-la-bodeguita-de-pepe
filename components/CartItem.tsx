'use client'

import { useCart } from '@/context/CartContext'
import { CartItem as CartItemType } from '@/types'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQty } = useCart()

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm text-[#212121] leading-snug line-clamp-2">
          {item.description}
        </p>
        <p className="font-label text-xs text-[#757575] mt-0.5">${item.price.toFixed(2)} c/u</p>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQty(item.code, item.quantity - 1)}
            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-[#757575] hover:border-[#E91E63] hover:text-[#E91E63] transition-colors text-lg leading-none"
          >
            −
          </button>
          <span className="font-body text-sm w-5 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQty(item.code, item.quantity + 1)}
            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-[#757575] hover:border-[#E91E63] hover:text-[#E91E63] transition-colors text-lg leading-none"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-label font-medium text-sm text-[#212121]">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <button
            onClick={() => removeItem(item.code)}
            className="text-[#757575] hover:text-red-500 transition-colors"
            aria-label="Eliminar"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
