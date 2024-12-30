'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface MapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  onLocationSelect?: (location: {
    lat: number
    lng: number
    address: string
  }) => void
}

export default function Map({ 
  center = { lat: 25.2048, lng: 55.2708 }, // Dubai coordinates
  zoom = 13,
  onLocationSelect 
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
        libraries: ['places']
      })

      const google = await loader.load()
      
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        const marker = new google.maps.Marker({
          map,
          position: center,
          draggable: true
        })

        setMap(map)
        setMarker(marker)

        // Handle marker drag events
        marker.addListener('dragend', async () => {
          const position = marker.getPosition()
          if (position && onLocationSelect) {
            const geocoder = new google.maps.Geocoder()
            const result = await geocoder.geocode({ location: position })
            
            if (result.results[0]) {
              onLocationSelect({
                lat: position.lat(),
                lng: position.lng(),
                address: result.results[0].formatted_address
              })
            }
          }
        })

        // Initialize search box
        const input = document.createElement('input')
        input.className = 'map-search-input'
        input.placeholder = 'Search for a location'
        
        const searchBox = new google.maps.places.SearchBox(input)
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

        // Handle place selection
        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces()
          if (places?.length) {
            const place = places[0]
            if (place.geometry?.location) {
              map.setCenter(place.geometry.location)
              marker.setPosition(place.geometry.location)
              
              if (onLocationSelect) {
                onLocationSelect({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  address: place.formatted_address || ''
                })
              }
            }
          }
        })
      }
    }

    initMap()
  }, [center, zoom, onLocationSelect])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg"
      style={{ position: 'relative' }}
    />
  )
} 