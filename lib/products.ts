import { ApiProduct } from './api'
import { Product } from '@/types'

export function mapProduct(p: ApiProduct): Product {
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
