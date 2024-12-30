'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RegistrationForm from '@/components/RegistrationForm'
import Badge from '@/components/Badge'

interface BadgeData {
  eventName: string
  eventDate: string
  eventBanner: string
  fullName: string
  jobTitle: string
  company: string
  phone: string
  email: string
}

export default function RegisterPage() {
  const t = useTranslations('registration')
  const [showBadge, setShowBadge] = useState(false)
  const [registrationData, setRegistrationData] = useState<null | BadgeData>(null)
  const searchParams = useSearchParams()
  
  const eventData = {
    name: searchParams.get('eventName') || '',
    date: searchParams.get('eventDate') || '',
    banner: searchParams.get('eventBanner') || ''
  }

  const handleRegistrationSuccess = (data: any) => {
    setRegistrationData(data)
    setShowBadge(true)
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <div className="container mx-auto px-4 py-16">
        {!showBadge ? (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">
              {t('registrationTitle')}
            </h1>
            <RegistrationForm 
              eventData={eventData}
              onSuccess={handleRegistrationSuccess}
            />
          </div>
        ) : (
          <div>
            <Badge data={registrationData} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
} 