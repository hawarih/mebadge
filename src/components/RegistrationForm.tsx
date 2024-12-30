'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { countries } from '@/data/countries'
import { nationalities } from '@/data/nationalities'
import { jobTitles } from '@/data/jobTitles'
import { visitReasons } from '@/data/visitReasons'

interface RegistrationFormProps {
  eventData: {
    id: string
    name: string
    date: string
    banner: string
  }
  onSuccess: (data: any) => void
}

export default function RegistrationForm({ eventData, onSuccess }: RegistrationFormProps) {
  const t = useTranslations('registration')
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phone: '',
    email: '',
    company: '',
    jobTitle: '',
    visitReason: '',
    country: '',
    nationality: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventId: eventData.id
        }),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      onSuccess(data)
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Event Details */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-4">{t('eventDetails')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('eventName')}</label>
            <input
              type="text"
              value={eventData.name}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('eventDate')}</label>
            <input
              type="text"
              value={eventData.date}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-4">{t('personalInfo')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('fullName')}</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('gender')}</label>
            <select
              required
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-amber-500"
            >
              <option value="">{t('selectGender')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('phone')}</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('email')}</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('company')}</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('jobTitle')}</label>
            <select
              required
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-amber-500"
            >
              <option value="">{t('selectJob')}</option>
              {jobTitles.map((job) => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('visitReason')}</label>
            <select
              required
              value={formData.visitReason}
              onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-amber-500"
            >
              <option value="">{t('selectReason')}</option>
              {visitReasons.map((reason) => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('country')}</label>
            <select
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-amber-500"
            >
              <option value="">{t('selectCountry')}</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('nationality')}</label>
            <select
              required
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-amber-500"
            >
              <option value="">{t('selectNationality')}</option>
              {nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>{nationality}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors"
      >
        {t('submit')}
      </button>
    </form>
  )
} 