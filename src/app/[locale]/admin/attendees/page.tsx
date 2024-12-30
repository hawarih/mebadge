'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { FaPrint } from 'react-icons/fa'
import Badge from '@/components/Badge'

interface Attendee {
  id: string
  fullName: string
  email: string
  phone: string
  company: string
  jobTitle: string
  eventName: string
  eventDate: string
  eventBanner: string
}

export default function AttendeesPage() {
  const t = useTranslations('admin')
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null)
  const [showBadge, setShowBadge] = useState(false)
  
  // Sample data - replace with API call later
  const [attendees] = useState<Attendee[]>([
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      company: 'Tech Corp',
      jobTitle: 'Software Engineer',
      eventName: 'Tech Conference 2024',
      eventDate: '2024-06-15',
      eventBanner: '/event-banner.jpg'
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1987654321',
      company: 'Design Studio',
      jobTitle: 'UI Designer',
      eventName: 'Tech Conference 2024',
      eventDate: '2024-06-15',
      eventBanner: '/event-banner.jpg'
    }
  ])

  const handlePrintBadge = (attendee: Attendee) => {
    setSelectedAttendee(attendee)
    setShowBadge(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('attendeesList')}</h1>
        <div className="flex gap-2">
          <input
            type="search"
            placeholder={t('searchAttendees')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {!showBadge ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('fullName')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('email')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('phone')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('company')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('jobTitle')}
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendees.map((attendee, index) => (
                  <tr key={attendee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {attendee.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {attendee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {attendee.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {attendee.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {attendee.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handlePrintBadge(attendee)}
                        className="text-amber-600 hover:text-amber-800 transition-colors"
                        title={t('printBadge')}
                      >
                        <FaPrint className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        selectedAttendee && (
          <div>
            <button
              onClick={() => setShowBadge(false)}
              className="mb-4 text-amber-600 hover:text-amber-800"
            >
              ← {t('backToList')}
            </button>
            <Badge data={selectedAttendee} />
          </div>
        )
      )}
    </div>
  )
} 