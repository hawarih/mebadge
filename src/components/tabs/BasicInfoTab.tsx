'use client'

import { useTranslations } from 'next-intl'
import { FaUpload } from 'react-icons/fa'
import Image from 'next/image'

interface BasicInfoData {
  name: string
  type: string
  specialization: string
  banner: File | null
  startDate: string
  endDate: string
  deadlineDate: string
  description: string
}

interface BasicInfoTabProps {
  data: BasicInfoData
  onChange: (data: BasicInfoData) => void
}

const eventTypes = [
  'conference',
  'workshop',
  'seminar',
  'exhibition',
  'hackathon',
  'meetup',
  'webinar'
]

const specializations = [
  'technology',
  'business',
  'healthcare',
  'education',
  'science',
  'arts',
  'engineering',
  'marketing',
  'finance',
  'design'
]

export default function BasicInfoTab({ data, onChange }: BasicInfoTabProps) {
  const t = useTranslations('admin')

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange({ ...data, banner: file })
  }

  return (
    <div className="space-y-6">
      {/* Event Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('eventName')}
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      {/* Event Type & Specialization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('eventType')}
          </label>
          <select
            value={data.type}
            onChange={(e) => onChange({ ...data, type: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
            required
          >
            <option value="">{t('selectEventType')}</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>
                {t(`eventTypes.${type}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('specialization')}
          </label>
          <select
            value={data.specialization}
            onChange={(e) => onChange({ ...data, specialization: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
            required
          >
            <option value="">{t('selectSpecialization')}</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>
                {t(`specializations.${spec}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Banner Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('eventBanner')}
        </label>
        <div className="border-2 border-dashed rounded-lg p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="hidden"
            id="banner-upload"
            required={!data.banner}
          />
          <label
            htmlFor="banner-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            {data.banner ? (
              <div className="relative w-full h-48">
                <Image
                  src={URL.createObjectURL(data.banner)}
                  alt="Event banner"
                  fill
                  className="object-cover rounded"
                />
              </div>
            ) : (
              <>
                <FaUpload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  {t('uploadBanner')}
                </span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('startDate')}
          </label>
          <input
            type="datetime-local"
            value={data.startDate}
            onChange={(e) => onChange({ ...data, startDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('endDate')}
          </label>
          <input
            type="datetime-local"
            value={data.endDate}
            onChange={(e) => onChange({ ...data, endDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('registrationDeadline')}
          </label>
          <input
            type="datetime-local"
            value={data.deadlineDate}
            onChange={(e) => onChange({ ...data, deadlineDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('description')}
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>
    </div>
  )
} 