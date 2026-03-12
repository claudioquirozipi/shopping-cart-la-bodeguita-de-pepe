'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type Action =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; code: string }
  | { type: 'UPDATE_QTY'; code: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_CART' }

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.code === action.product.code)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.code === action.product.code ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.product, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.code !== action.code) }
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.code !== action.code) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.code === action.code ? { ...i, quantity: action.quantity } : i
        ),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (code: string) => void
  updateQty: (code: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem: (product) => dispatch({ type: 'ADD_ITEM', product }),
        removeItem: (code) => dispatch({ type: 'REMOVE_ITEM', code }),
        updateQty: (code, quantity) => dispatch({ type: 'UPDATE_QTY', code, quantity }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
