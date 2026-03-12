import { CartItem } from '@/types'

export function buildWhatsAppUrl(
  items: CartItem[],
  total: number,
  phone: string,
): string {
  const lines = items.map(
    (item) =>
      `• ${item.description} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`,
  )

  const message = [
    '🛒 *Pedido*',
    '',
    '📦 *Productos:*',
    ...lines,
    '',
    `💰 *Total: $${total.toFixed(2)}*`,
  ].join('\n')

  const number = phone.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
