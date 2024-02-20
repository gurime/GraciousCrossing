import './globals.css'
import { Inter, Roboto,Montserrat,Open_Sans } from 'next/font/google'

const inter = Open_Sans ({ subsets: ['latin'],weight:['400'] })

export const metadata = {
  title: 'Page Not Found',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}