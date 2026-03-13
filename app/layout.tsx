import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Distribuidora Shon C.A. — Lista de Precios',
  description: 'Catálogo de productos y lista de precios de Distribuidora Shon C.A.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${montserrat.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
