import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import { WelcomeEmail } from '@/emails/WelcomeEmail'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Create attendee record
    const attendee = await prisma.attendee.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        jobTitle: data.jobTitle,
        eventId: data.eventId
      },
      include: {
        event: true
      }
    })

    // Send welcome email
    const emailHtml = await render(WelcomeEmail({
      name: attendee.fullName,
      eventName: attendee.event.name,
      eventDate: attendee.event.date.toLocaleDateString(),
      eventLocation: attendee.event.location,
      badgeUrl: `${process.env.NEXT_PUBLIC_APP_URL}/badge/${attendee.id}`,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attendee.event.location)}`,
    }))

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: attendee.email,
      subject: `Welcome to ${attendee.event.name}!`,
      html: emailHtml,
    })

    return NextResponse.json(attendee)
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    )
  }
} 