'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { languages } from '@/config/languages'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()

  const handleChange = (newLocale: string) => {
    // Remove current locale from path
    const currentPath = window.location.pathname
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <select
      onChange={(e) => handleChange(e.target.value)}
      value={locale}
      className="bg-amber-800 text-white border border-amber-700 rounded px-2 py-1"
    >
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  )
} 