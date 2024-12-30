'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

export default function CountdownTimer() {
  const t = useTranslations('countdown')
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2024-12-31')

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-amber-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8 text-4xl font-bold">
          <div className="text-center">
            <div>{countdown.days}</div>
            <div className="text-xl">{t('days')}</div>
          </div>
          <div className="text-center">
            <div>{countdown.hours}</div>
            <div className="text-xl">{t('hours')}</div>
          </div>
          <div className="text-center">
            <div>{countdown.minutes}</div>
            <div className="text-xl">{t('minutes')}</div>
          </div>
          <div className="text-center">
            <div>{countdown.seconds}</div>
            <div className="text-xl">{t('seconds')}</div>
          </div>
        </div>
      </div>
    </div>
  )
} 