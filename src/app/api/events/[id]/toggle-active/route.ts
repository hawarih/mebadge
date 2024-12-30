import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: { isActive: !event.isActive }
    })

    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('Failed to toggle event status:', error)
    return NextResponse.json(
      { error: 'Failed to toggle event status' },
      { status: 500 }
    )
  }
} 