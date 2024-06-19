import { Inter } from 'next/font/google'
import './ui/globals.css'
import { icons } from 'react-icons'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Discord-bot',
  description: 'Next.js',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
