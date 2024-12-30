'use client'

import { useTranslations } from 'next-intl'
import { FaTicketAlt } from 'react-icons/fa'

interface TicketData {
  type: string
  price: number
  capacity: number
  isEarlyBird: boolean
  earlyBirdDiscount: number
}

interface TicketTabProps {
  data: TicketData
  onChange: (data: TicketData) => void
}

const ticketTypes = ['free', 'paid', 'invitation']

export default function TicketTab({ data, onChange }: TicketTabProps) {
  const t = useTranslations('admin')

  return (
    <div className="space-y-6">
      {/* Ticket Type */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('ticketType')}
        </label>
        <div className="grid grid-cols-3 gap-4">
          {ticketTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange({ ...data, type })}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                data.type === type
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 hover:border-amber-200'
              }`}
            >
              <FaTicketAlt />
              {t(`ticketTypes.${type}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Price (only for paid tickets) */}
      {data.type === 'paid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('ticketPrice')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={data.price}
                onChange={(e) => onChange({ ...data, price: parseFloat(e.target.value) || 0 })}
                className="w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Early Bird Discount */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="earlyBird"
                checked={data.isEarlyBird}
                onChange={(e) => onChange({ ...data, isEarlyBird: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="earlyBird" className="text-sm font-medium">
                {t('earlyBirdDiscount')}
              </label>
            </div>
            {data.isEarlyBird && (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.earlyBirdDiscount}
                  onChange={(e) => 
                    onChange({ ...data, earlyBirdDiscount: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Capacity */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('capacity')}
        </label>
        <input
          type="number"
          min="1"
          value={data.capacity}
          onChange={(e) => onChange({ ...data, capacity: parseInt(e.target.value) || 0 })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          {t('capacityHelp')}
        </p>
      </div>

      {/* Additional Information Box */}
      <div className="bg-amber-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <FaTicketAlt className="text-amber-600" />
          {t('ticketSummary')}
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>
            {t('selectedType')}: {t(`ticketTypes.${data.type}`)}
          </li>
          {data.type === 'paid' && (
            <>
              <li>
                {t('price')}: ${data.price}
              </li>
              {data.isEarlyBird && (
                <li>
                  {t('earlyBirdDiscount')}: {data.earlyBirdDiscount}%
                </li>
              )}
            </>
          )}
          <li>
            {t('maxCapacity')}: {data.capacity} {t('attendees')}
          </li>
        </ul>
      </div>
    </div>
  )
} 