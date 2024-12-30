'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import Carousel from './Carousel'

export default function Header() {
  const t = useTranslations('navigation')
  const pathname = usePathname()

  return (
    <header className="bg-amber-900">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-white text-2xl font-bold">
          Badge
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            href="/about" 
            className={`text-white hover:text-amber-200 ${
              pathname === '/about' ? 'font-bold' : ''
            }`}
          >
            {t('about')}
          </Link>
          <Link 
            href="/login" 
            className={`text-white hover:text-amber-200 ${
              pathname === '/login' ? 'font-bold' : ''
            }`}
          >
            {t('login')}
          </Link>
          <Link 
            href="/register" 
            className={`text-white hover:text-amber-200 ${
              pathname === '/register' ? 'font-bold' : ''
            }`}
          >
            {t('register')}
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
      <Carousel />
    </header>
  )
} 