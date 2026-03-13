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
  title: 'La Bodeguita de Pepe',
  description: 'Explora nuestro catálogo de productos frescos y de calidad. Haz tu pedido fácilmente y envíalo por WhatsApp.',
  openGraph: {
    title: 'La Bodeguita de Pepe',
    description: 'Explora nuestro catálogo de productos frescos y de calidad. Haz tu pedido fácilmente y envíalo por WhatsApp.',
    images: [
      {
        url: '/og-image.png',
        width: 800,
        height: 800,
        alt: 'La Bodeguita de Pepe',
      },
    ],
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'La Bodeguita de Pepe',
    description: 'Explora nuestro catálogo de productos frescos y de calidad. Haz tu pedido fácilmente y envíalo por WhatsApp.',
    images: ['/og-image.png'],
  },
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
