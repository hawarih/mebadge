'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'

const images = [
  {
    src: '/event1.jpg',
    alt: 'Tech Conference',
    title: 'Tech Conference 2024'
  },
  {
    src: '/event2.jpg',
    alt: 'Web Summit',
    title: 'Web Summit 2024'
  },
  {
    src: '/event3.jpg',
    alt: 'AI Symposium',
    title: 'AI Symposium'
  },
  {
    src: '/event4.jpg',
    alt: 'Developer Conference',
    title: 'DevConf 2024'
  }
]

export default function Carousel() {
  const [currentImage, setCurrentImage] = useState(0)
  const locale = useLocale()
  const isRTL = locale === 'ar'

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div 
        className={`absolute w-full h-full transition-transform duration-500 flex ${isRTL ? 'flex-row-reverse' : ''}`}
        style={{ 
          transform: `translateX(${isRTL ? currentImage * 100 : -currentImage * 100}%)`,
          width: `${images.length * 100}%`
        }}
      >
        {images.map((img, index) => (
          <div key={img.src} className="relative w-full h-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-2xl font-bold text-center">{img.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentImage ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  )
} 