import { useTranslations } from 'next-intl'
import { FaUsers, FaMicrophone } from 'react-icons/fa'
import Image from 'next/image'

interface EventCardProps {
  title: string
  date: string
  image: string
  attendees: number
  speakers: number
}

export default function EventCard({
  title,
  date,
  image,
  attendees,
  speakers
}: EventCardProps) {
  const t = useTranslations('events')

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-opacity duration-300 hover:opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{date}</p>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            <span>{attendees} {t('attendees')}</span>
          </div>
          <div className="flex items-center">
            <FaMicrophone className="mr-2" />
            <span>{speakers} {t('speakers')}</span>
          </div>
        </div>
        <button className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600">
          {t('register')}
        </button>
      </div>
    </div>
  )
} 