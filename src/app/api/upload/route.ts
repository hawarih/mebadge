import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const hash = crypto.createHash('md5').update(buffer).digest('hex')
    const ext = file.name.split('.').pop()
    const filename = `${hash}.${ext}`

    // Save file to public directory
    const path = join(process.cwd(), 'public/uploads', filename)
    await writeFile(path, buffer)

    // Return the public URL
    return NextResponse.json({ 
      url: `/uploads/${filename}`
    })
  } catch (error) {
    console.error('Failed to upload file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

export const config = {
  api: {
    bodyParser: false
  }
} 