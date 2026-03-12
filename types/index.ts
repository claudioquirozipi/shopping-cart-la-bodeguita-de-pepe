export interface Product {
  id: number
  code: string
  description: string
  basePrice: number
  price: number  // precio lista-1 (usado en el carrito)
  image: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}
