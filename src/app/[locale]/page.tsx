import Header from '@/components/Header'
import CountdownTimer from '@/components/Countdown'
import EventCard from '@/components/EventCard'
import SpeakerCard from '@/components/SpeakerCard'
import Footer from '@/components/Footer'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()

  const events = [
    {
      title: 'Tech Conference 2024',
      date: '2024-12-31',
      image: '/event1.jpg',
      attendees: 500,
      speakers: 20
    },
    {
      title: 'Web Summit 2024',
      date: '2024-11-15',
      image: '/event2.jpg',
      attendees: 300,
      speakers: 15
    },
    {
      title: 'AI Symposium',
      date: '2024-10-20',
      image: '/event3.jpg',
      attendees: 400,
      speakers: 18
    }
  ]

  const speakers = [
    {
      name: 'John Doe',
      image: '/speaker1.jpg',
      profile: 'Tech Lead at Company X',
      social: {
        twitter: 'https://twitter.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe'
      }
    },
    {
      name: 'Jane Smith',
      image: '/speaker2.jpg',
      profile: 'AI Researcher',
      social: {
        twitter: 'https://twitter.com/janesmith',
        linkedin: 'https://linkedin.com/in/janesmith'
      }
    },
    {
      name: 'Mike Johnson',
      image: '/speaker3.jpg',
      profile: 'Software Architect',
      social: {
        twitter: 'https://twitter.com/mikejohnson',
        linkedin: 'https://linkedin.com/in/mikejohnson'
      }
    }
  ]

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <CountdownTimer />
      
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('events.featured')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('speakers.featured')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={index} {...speaker} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
} 