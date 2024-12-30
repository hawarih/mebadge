import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

interface SpeakerCardProps {
  name: string
  image: string
  profile: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export default function SpeakerCard({
  name,
  image,
  profile,
  social
}: SpeakerCardProps) {
  const t = useTranslations('speakers')

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 bg-gray-200">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300 hover:opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{profile}</p>
        <div className="flex space-x-4">
          {social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl hover:text-blue-400" />
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl hover:text-blue-700" />
            </a>
          )}
          {social.github && (
            <a href={social.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-xl hover:text-gray-700" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
} 