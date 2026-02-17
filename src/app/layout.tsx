import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Candy AI - AI Girlfriend Chat',
  description: 'Chat with AI companions - voice, images & video',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-candy-dark min-h-screen`}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-[200px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
