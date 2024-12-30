'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Map from '@/components/Map'

interface VenueData {
  location: string
  address: string
  latitude: number
  longitude: number
}

interface VenueTabProps {
  data: VenueData
  onChange: (data: VenueData) => void
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: 25.2048, // Dubai's coordinates
  lng: 55.2708
}

export default function VenueTab({ data, onChange }: VenueTabProps) {
  const t = useTranslations('admin')
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([])

  const handlePlaceSelect = async (placeId: string) => {
    const geocoder = new google.maps.Geocoder()
    const places = new google.maps.places.PlacesService(
      document.createElement('div')
    )

    places.getDetails(
      {
        placeId: placeId,
        fields: ['formatted_address', 'geometry', 'name']
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          onChange({
            location: place.name || '',
            address: place.formatted_address || '',
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          })
          setSuggestions([])
          setSearchQuery(place.name || '')
        }
      }
    )
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    if (value.length > 2) {
      const service = new google.maps.places.AutocompleteService()
      service.getPlacePredictions(
        {
          input: value,
          types: ['establishment', 'geocode']
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions)
          } else {
            setSuggestions([])
          }
        }
      )
    } else {
      setSuggestions([])
    }
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode(
        { location: { lat: e.latLng.lat(), lng: e.latLng.lng() } },
        (results, status) => {
          if (status === 'OK' && results?.[0]) {
            onChange({
              location: results[0].formatted_address,
              address: results[0].formatted_address,
              latitude: e.latLng!.lat(),
              longitude: e.latLng!.lng()
            })
            setSearchQuery(results[0].formatted_address)
            setSuggestions([])
          }
        }
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Location Search */}
      <div className="relative">
        <label className="block text-sm font-medium mb-2">
          {t('searchLocation')}
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
            placeholder={t('searchLocationPlaceholder')}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.place_id}
                onClick={() => handlePlaceSelect(suggestion.place_id)}
                className="w-full px-4 py-2 text-left hover:bg-amber-50 transition-colors"
              >
                {suggestion.description}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <Map
        center={data.latitude ? { lat: data.latitude, lng: data.longitude } : undefined}
        onLocationSelect={({ lat, lng, address }) => {
          onChange({
            ...data,
            location: address,
            address: address,
            latitude: lat,
            longitude: lng
          })
        }}
      />

      {/* Selected Location Details */}
      {data.location && (
        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">{t('selectedLocation')}</h3>
          <p className="text-gray-600">{data.location}</p>
          <p className="text-gray-600 mt-1">{data.address}</p>
        </div>
      )}
    </div>
  )
} 