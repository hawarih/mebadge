import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
  eventName: string
  eventDate: string
  eventLocation: string
  badgeUrl: string
  mapUrl: string
}

export const WelcomeEmail = ({
  name,
  eventName,
  eventDate,
  eventLocation,
  badgeUrl,
  mapUrl,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container>
        <Heading>Welcome to {eventName}!</Heading>
        <Text>Hello {name},</Text>
        <Text>
          Thank you for registering for {eventName}. The event will take place on {eventDate}.
        </Text>
        <Text>
          Location: <Link href={mapUrl}>{eventLocation}</Link>
        </Text>
        <Text>
          Download your badge here: <Link href={badgeUrl}>Download Badge</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
} 