import type { Metadata } from 'next'
import { Poppins, Quicksand } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['500'],
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
      <body className={`${poppins.variable} ${quicksand.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
