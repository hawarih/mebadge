'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import { FaDownload } from 'react-icons/fa'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

interface BadgeProps {
  data: {
    eventName: string
    eventDate: string
    eventBanner: string
    fullName: string
    jobTitle: string
    company: string
    phone: string
    email: string
  }
}

export default function Badge({ data }: BadgeProps) {
  const t = useTranslations('registration')

  const handleDownloadPDF = async () => {
    const badge = document.getElementById('badge')
    if (badge) {
      const dataUrl = await toPng(badge)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: [4, 6]
      })
      pdf.addImage(dataUrl, 'PNG', 0, 0, 4, 6)
      pdf.save('badge.pdf')
    }
  }

  const qrData = JSON.stringify({
    name: data.fullName,
    phone: data.phone,
    email: data.email,
    company: data.company
  })

  return (
    <div className="max-w-md mx-auto">
      <div 
        id="badge"
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ width: '4in', height: '6in' }}
      >
        {/* Event Banner */}
        <div className="relative h-40">
          <Image
            src={data.eventBanner}
            alt={data.eventName}
            fill
            className="object-cover"
          />
        </div>

        {/* Badge Content */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">{data.fullName}</h2>
          <p className="text-lg text-gray-600 mb-1">{data.jobTitle}</p>
          <p className="text-lg text-gray-600 mb-4">{data.company}</p>

          {/* QR Code */}
          <div className="flex justify-center mb-4">
            <QRCodeSVG value={qrData} size={150} />
          </div>

          <p className="text-sm text-gray-500">{data.eventName}</p>
          <p className="text-sm text-gray-500">{data.eventDate}</p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-6 w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center"
      >
        <FaDownload className="mr-2" />
        {t('downloadBadge')}
      </button>
    </div>
  )
} 