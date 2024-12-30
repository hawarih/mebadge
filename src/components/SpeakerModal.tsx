'use client'

import Image from 'next/image'
import { FaTimes, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa'

interface SpeakerModalProps {
  speaker: {
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
  onClose: () => void
}

export default function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src={speaker.photo}
            alt={speaker.name}
            width={150}
            height={150}
            className="rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold">{speaker.name}</h2>
          <p className="text-gray-600">{speaker.title}</p>
        </div>

        <p className="text-gray-700 mb-6">{speaker.bio}</p>

        <div className="flex justify-center gap-4">
          {speaker.social.twitter && (
            <a
              href={speaker.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          )}
          {speaker.social.linkedin && (
            <a
              href={speaker.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          )}
          {speaker.social.website && (
            <a
              href={speaker.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <FaGlobe className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
} 