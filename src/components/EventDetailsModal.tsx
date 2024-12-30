'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FaTimes, FaUsers, FaMicrophone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import SpeakerModal from './SpeakerModal'
import { useState } from 'react'

interface Speaker {
  id: string
  name: string
  photo: string
  title: string
  bio: string
  social: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

interface Attendee {
  id: string
  name: string
  email: string
  phone: string
  company: string
  jobTitle: string
}

interface EventDetailsModalProps {
  event: {
    id: string
    name: string
    banner: string
    date: string
    location: string
    description: string
    attendees?: Attendee[]
    speakers?: Speaker[]
  }
  onClose: () => void
}

export default function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  const t = useTranslations('admin')
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative h-64">
          <Image
            src={event.banner}
            alt={event.name}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <h2 className="text-3xl font-bold">{event.name}</h2>
          
          <div className="flex gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>{event.location}</span>
            </div>
          </div>

          <p className="text-gray-600">{event.description}</p>

          {/* Speakers Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaMicrophone className="text-amber-600" />
              {t('speakers')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.speakers?.map((speaker) => (
                <button
                  key={speaker.id}
                  onClick={() => setSelectedSpeaker(speaker)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <Image
                    src={speaker.photo}
                    alt={speaker.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-medium">{speaker.name}</div>
                    <div className="text-sm text-gray-600">{speaker.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Attendees Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaUsers className="text-amber-600" />
              {t('attendees')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.attendees?.map((attendee) => (
                <div key={attendee.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{attendee.name}</div>
                  <div className="text-sm text-gray-600">{attendee.company}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </div>
  )
} 