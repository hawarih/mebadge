import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.event.create({
    data: {
      name: 'Tech Conference 2024',
      banner: '/event-banner.jpg',
      description: 'Join us for the biggest tech conference',
      date: new Date('2024-06-15'),
      location: 'Dubai',
      isActive: true
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 