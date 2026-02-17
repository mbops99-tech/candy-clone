'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: '🏠', label: 'Home', href: '/' },
  { icon: '🔍', label: 'Discover', href: '/discover' },
  { icon: '💬', label: 'Chat', href: '/chats' },
  { icon: '📁', label: 'Collection', href: '/collection' },
  { icon: '🎨', label: 'Generate Image', href: '/generate' },
  { icon: '✨', label: 'Create Character', href: '/create' },
  { icon: '❤️', label: 'My AI', href: '/my-ai' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-[200px] bg-candy-dark border-r border-gray-800 p-4 flex flex-col">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <span className="text-2xl">🍬</span>
        <span className="text-xl font-bold gradient-text">candy.ai</span>
      </Link>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-candy-light text-white'
                    : 'text-gray-400 hover:text-white hover:bg-candy-gray'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Premium */}
        <div className="mt-4 px-4 py-3 flex items-center gap-3">
          <span>💎</span>
          <span className="text-sm text-gray-400">Premium</span>
          <span className="ml-auto text-xs bg-candy-pink text-white px-2 py-0.5 rounded">70% OFF</span>
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-800 pt-4 space-y-2">
        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white text-sm">
          <span>🌐</span> English
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white text-sm">
          <span>💬</span> Discord
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white text-sm">
          <span>❓</span> Help Center
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white text-sm">
          <span>📧</span> Contact Us
        </Link>
      </div>
    </aside>
  )
}
