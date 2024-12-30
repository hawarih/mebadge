'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaUsers, 
  FaMicrophone, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaSpinner 
} from 'react-icons/fa'
import EventDetailsModal from '@/components/EventDetailsModal'

interface Event {
  id: string
  name: string
  banner: string
  date: string
  location: string
  description: string
  isActive: boolean
  _count: {
    attendees: number
    speakers: number
  }
  attendees?: Attendee[]
  speakers?: Speaker[]
}

interface Attendee {
  id: string
  name: string
  // ... other attendee fields
}

interface Speaker {
  id: string
  name: string
  // ... other speaker fields
}

export default function EventsPage() {
  const t = useTranslations('admin')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (id: string) => {
    try {
      const response = await fetch(`/api/events/${id}/toggle-active`, {
        method: 'PATCH'
      })
      if (!response.ok) throw new Error('Failed to update')
      fetchEvents()
    } catch (error) {
      console.error('Failed to toggle event status:', error)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error('Failed to delete')
        fetchEvents()
      } catch (error) {
        console.error('Failed to delete event:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('eventsList')}</h1>
        <Link
          href="/admin/events/create"
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlus />
          {t('createEvent')}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div 
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Event Banner */}
            <div className="relative h-48">
              <Image
                src={event.banner}
                alt={event.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Event Content */}
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{event.name}</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={event.isActive}
                    onChange={() => handleToggleActive(event.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>

              <div className="flex justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-amber-600" />
                  <span>{event._count.attendees} {t('attendees')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMicrophone className="text-amber-600" />
                  <span>{event._count.speakers} {t('speakers')}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded transition-colors"
                >
                  <FaEye />
                  {t('view')}
                </button>
                <Link
                  href={`/admin/events/${event.id}/edit`}
                  className="flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded transition-colors"
                >
                  <FaEdit />
                  {t('edit')}
                </Link>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded transition-colors"
                >
                  <FaTrash />
                  {t('delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
} 