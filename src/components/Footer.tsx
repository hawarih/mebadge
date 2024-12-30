import Link from 'next/link'
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Badge</h3>
            <p className="text-amber-200">
              Your premier destination for professional events and networking.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-amber-200">About Us</Link></li>
              <li><Link href="/events" className="hover:text-amber-200">Events</Link></li>
              <li><Link href="/contact" className="hover:text-amber-200">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-200"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-amber-200"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-amber-200"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 Badge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 