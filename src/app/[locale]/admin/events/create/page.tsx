'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { 
  FaInfoCircle, 
  FaMapMarkerAlt, 
  FaTicketAlt, 
  FaMicrophone,
  FaUpload,
  FaSpinner 
} from 'react-icons/fa'
import dynamic from 'next/dynamic'
import BasicInfoTab from '@/components/tabs/BasicInfoTab'
import VenueTab from '@/components/tabs/VenueTab'
import TicketTab from '@/components/tabs/TicketTab'
import SpeakersTab from '@/components/tabs/SpeakersTab'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

interface FormData {
  basicInfo: {
    name: string
    type: string
    specialization: string
    banner: File | null
    startDate: string
    endDate: string
    deadlineDate: string
    description: string
  }
  venue: {
    location: string
    address: string
    latitude: number
    longitude: number
  }
  ticket: {
    type: string
    price: number
    capacity: number
    isEarlyBird: boolean
    earlyBirdDiscount: number
  }
  speakers: Array<{
    name: string
    company: string
    position: string
    profile: string
    photo: File | null
  }>
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

const ticketTypes = ['free', 'paid', 'invitation']

export default function CreateEventPage() {
  const t = useTranslations('admin')
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('basicInfo')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      name: '',
      type: '',
      specialization: '',
      banner: null,
      startDate: '',
      endDate: '',
      deadlineDate: '',
      description: ''
    },
    venue: {
      location: '',
      address: '',
      latitude: 0,
      longitude: 0
    },
    ticket: {
      type: 'free',
      price: 0,
      capacity: 0,
      isEarlyBird: false,
      earlyBirdDiscount: 0
    },
    speakers: []
  })

  const tabs = [
    { id: 'basicInfo', label: 'basicInfo', icon: FaInfoCircle },
    { id: 'venue', label: 'venue', icon: FaMapMarkerAlt },
    { id: 'ticket', label: 'ticket', icon: FaTicketAlt },
    { id: 'speakers', label: 'speakers', icon: FaMicrophone }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Handle file uploads first
      const bannerUrl = await uploadFile(formData.basicInfo.banner)
      const speakerPhotos = await Promise.all(
        formData.speakers.map(speaker => uploadFile(speaker.photo))
      )

      const eventData = {
        ...formData,
        basicInfo: {
          ...formData.basicInfo,
          banner: bannerUrl
        },
        speakers: formData.speakers.map((speaker, index) => ({
          ...speaker,
          photo: speakerPhotos[index]
        }))
      }

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })

      if (!response.ok) throw new Error('Failed to create event')

      router.push('/admin/events')
    } catch (error) {
      console.error('Failed to create event:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file: File | null) => {
    if (!file) return null

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) throw new Error('Failed to upload file')

    const data = await response.json()
    return data.url
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('createEvent')}</h1>

      {/* Tabs */}
      <div className="flex mb-6 border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 -mb-px ${
              activeTab === tab.id
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-amber-600'
            }`}
          >
            <tab.icon />
            {t(tab.label)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tab Content */}
        {activeTab === 'basicInfo' && (
          <BasicInfoTab
            data={formData.basicInfo}
            onChange={data => setFormData({ ...formData, basicInfo: data })}
          />
        )}

        {activeTab === 'venue' && (
          <VenueTab
            data={formData.venue}
            onChange={data => setFormData({ ...formData, venue: data })}
          />
        )}

        {activeTab === 'ticket' && (
          <TicketTab
            data={formData.ticket}
            onChange={data => setFormData({ ...formData, ticket: data })}
          />
        )}

        {activeTab === 'speakers' && (
          <SpeakersTab
            data={formData.speakers}
            onChange={data => setFormData({ ...formData, speakers: data })}
          />
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <FaSpinner className="animate-spin" />}
            {t('createEvent')}
          </button>
        </div>
      </form>
    </div>
  )
} 