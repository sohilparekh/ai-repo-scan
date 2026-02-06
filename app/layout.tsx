import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Navigation from '@/components/Navigation'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Quotes',
  description: 'Starter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
