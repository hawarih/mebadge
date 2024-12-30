'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FaUpload, FaTrash, FaPlus } from 'react-icons/fa'
import Image from 'next/image'

interface Speaker {
  name: string
  company: string
  position: string
  profile: string
  photo: File | null
}

interface SpeakersTabProps {
  data: Speaker[]
  onChange: (data: Speaker[]) => void
}

export default function SpeakersTab({ data, onChange }: SpeakersTabProps) {
  const t = useTranslations('admin')
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const handlePhotoChange = (index: number, file: File | null) => {
    const newSpeakers = [...data]
    newSpeakers[index] = { ...newSpeakers[index], photo: file }
    onChange(newSpeakers)
  }

  const handleAddSpeaker = () => {
    onChange([
      ...data,
      {
        name: '',
        company: '',
        position: '',
        profile: '',
        photo: null
      }
    ])
    setEditIndex(data.length)
  }

  const handleRemoveSpeaker = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
    setEditIndex(null)
  }

  const handleSpeakerChange = (index: number, field: keyof Speaker, value: string) => {
    const newSpeakers = [...data]
    newSpeakers[index] = { ...newSpeakers[index], [field]: value }
    onChange(newSpeakers)
  }

  return (
    <div className="space-y-6">
      {/* Speakers List */}
      <div className="grid grid-cols-1 gap-6">
        {data.map((speaker, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">
                {t('speaker')} #{index + 1}
              </h3>
              <button
                onClick={() => handleRemoveSpeaker(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Speaker Photo */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('speakerPhoto')}
                </label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange(index, e.target.files?.[0] || null)}
                    className="hidden"
                    id={`photo-upload-${index}`}
                  />
                  <label
                    htmlFor={`photo-upload-${index}`}
                    className="cursor-pointer flex flex-col items-center"
                  >
                    {speaker.photo ? (
                      <div className="relative w-32 h-32">
                        <Image
                          src={URL.createObjectURL(speaker.photo)}
                          alt={speaker.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <>
                        <FaUpload className="w-8 h-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">
                          {t('uploadPhoto')}
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                {/* Speaker Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('speakerName')}
                  </label>
                  <input
                    type="text"
                    value={speaker.name}
                    onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('company')}
                  </label>
                  <input
                    type="text"
                    value={speaker.company}
                    onChange={(e) => handleSpeakerChange(index, 'company', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('position')}
                  </label>
                  <input
                    type="text"
                    value={speaker.position}
                    onChange={(e) => handleSpeakerChange(index, 'position', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Profile */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('profile')}
              </label>
              <textarea
                value={speaker.profile}
                onChange={(e) => handleSpeakerChange(index, 'profile', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Speaker Button */}
      <button
        type="button"
        onClick={handleAddSpeaker}
        className="w-full py-3 border-2 border-dashed border-amber-500 rounded-lg text-amber-600 hover:bg-amber-50 flex items-center justify-center gap-2"
      >
        <FaPlus />
        {t('addSpeaker')}
      </button>
    </div>
  )
} 