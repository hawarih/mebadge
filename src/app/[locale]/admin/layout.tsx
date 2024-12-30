'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaChartLine, 
  FaCalendarAlt, 
  FaUsers, 
  FaMicrophone, 
  FaCog,
  FaBars,
  FaHome
} from 'react-icons/fa'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin')
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { path: '/admin/dashboard', icon: FaChartLine, label: 'overview' },
    { path: '/admin/events', icon: FaCalendarAlt, label: 'events' },
    { path: '/admin/attendees', icon: FaUsers, label: 'attendees' },
    { path: '/admin/speakers', icon: FaMicrophone, label: 'speakers' },
    { path: '/admin/settings', icon: FaCog, label: 'settings' }
  ]

  return (
    <div className="min-h-screen bg-amber-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-amber-900 text-white fixed md:static h-full transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 md:w-16'
        } overflow-hidden`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className={`font-bold text-xl ${!sidebarOpen && 'md:hidden'}`}>
            {t('dashboard')}
          </h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-2 rounded hover:bg-amber-800"
          >
            <FaBars />
          </button>
        </div>
        <nav className="mt-6">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="flex items-center px-4 py-3 text-amber-200 hover:bg-amber-800"
          >
            <FaHome className="w-5 h-5" />
            <span className={`ml-3 ${!sidebarOpen && 'md:hidden'}`}>
              {t('backToHome')}
            </span>
          </Link>

          <div className="my-4 border-t border-amber-800" />

          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 ${
                pathname === item.path 
                  ? 'bg-amber-800 border-r-4 border-amber-500' 
                  : 'hover:bg-amber-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className={`ml-3 ${!sidebarOpen && 'md:hidden'}`}>
                {t(item.label)}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
} 