import { auth, db } from '../firebase'

import {
  addDoc,
  collection,
} from 'firebase/firestore'

import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'

import jsPDF from 'jspdf'

function ChangeMapView({ center }) {

  const map = useMap()

  useEffect(() => {

    map.setView(center, 12)

  }, [center, map])

  return null

}

function TripResult() {

  const location = useLocation()

  const {
    itinerary,
    tripData,
    famousHotels,
    famousRestaurants,
    famousPlaces,
  } = location.state || {}

  const [coordinates, setCoordinates] =
    useState([28.6139, 77.2090])

  const [destinationImage, setDestinationImage] =
    useState('')

  const [hotelImages, setHotelImages] =
    useState({})

  const [restaurantImages, setRestaurantImages] =
    useState({})

  const [placeImages, setPlaceImages] =
    useState({})

  useEffect(() => {

    if (!tripData?.destination) {
      return
    }

    const fetchLocationData = async () => {

      const fetchPexelsImage = async (
        query
      ) => {

        try {

          const response = await axios.get(
            'https://api.pexels.com/v1/search',
            {
              headers: {
                Authorization:
                  import.meta.env
                    .VITE_PEXELS_API_KEY,
              },
              params: {
                query,
                per_page: 1,
              },
            }
          )

          return (
            response.data.photos[0]?.src
              ?.large ||
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
          )

        } catch {

          return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'

        }

      }

      try {

        const geoRes =
          await axios.get(
            'https://api.geoapify.com/v1/geocode/search',
            {
              params: {
                text:
                  tripData.destination,
                apiKey:
                  import.meta.env
                    .VITE_GEOAPIFY_API_KEY,
              },
            }
          )

        const lat =
          geoRes.data.features[0]
            .properties.lat

        const lon =
          geoRes.data.features[0]
            .properties.lon

        setCoordinates([lat, lon])

        const cityImage =
          await fetchPexelsImage(
            `${tripData.destination} tourism`
          )

        setDestinationImage(cityImage)

        const hotelImgs = {}
        const restaurantImgs = {}
        const placeImgs = {}

        for (const hotel of famousHotels || []) {

          hotelImgs[hotel.name] =
            await fetchPexelsImage(
              `${hotel.name} hotel`
            )

        }

        for (const restaurant of famousRestaurants || []) {

          restaurantImgs[
            restaurant.name
          ] =
            await fetchPexelsImage(
              `${restaurant.name} cafe`
            )

        }

        for (const place of famousPlaces || []) {

          placeImgs[place.name] =
            await fetchPexelsImage(
              `${place.name}`
            )

        }

        setHotelImages(hotelImgs)

        setRestaurantImages(
          restaurantImgs
        )

        setPlaceImages(placeImgs)

      } catch {

        console.log('Error fetching location data')

      }

    }

    fetchLocationData()

  }, [
    tripData?.destination,
    famousHotels,
    famousRestaurants,
    famousPlaces,
  ])

  const downloadPDF = () => {

    const doc = new jsPDF()

    doc.setFontSize(22)

    doc.text(
      `Trip To ${tripData.destination}`,
      20,
      20
    )

    let y = 40

    Object.entries(itinerary).forEach(
      ([day, details]) => {

        doc.setFontSize(18)

        doc.text(
          day.toUpperCase(),
          20,
          y
        )

        y += 10

        doc.setFontSize(12)

        const sections = [

          `Title: ${details.title}`,

          `Morning: ${details.morning}`,

          `Afternoon: ${details.afternoon}`,

          `Evening: ${details.evening}`,

          `Food: ${details.recommendedFood}`,

          `Photo Spots: ${details.bestPhotoSpots}`,

          `Shopping: ${details.shoppingSuggestions}`,

          `Transportation: ${details.transportation}`,

          `Budget: ${details.estimatedBudget}`,

          `Travel Tips: ${details.travelTips}`,

        ]

        sections.forEach((section) => {

          const splitText =
            doc.splitTextToSize(
              section,
              170
            )

          doc.text(
            splitText,
            20,
            y
          )

          y += splitText.length * 8

          if (y > 270) {

            doc.addPage()

            y = 20

          }

        })

        y += 10

      }
    )

    doc.save(
      `${tripData.destination}-itinerary.pdf`
    )

  }
  const handleSaveTrip =
  async () => {

    try {

      if (!auth.currentUser) {

        toast.error(
          'Please login first'
        )

        return

      }

      await addDoc(
        collection(db, 'savedTrips'),
        {

          userId:
            auth.currentUser.uid,

          destination:
            tripData.destination,

          startDate:
            tripData.startDate,

          endDate:
            tripData.endDate,

          budget:
            tripData.budget,

          travelType:
            tripData.travelType,

          interests:
            tripData.interests,

          itinerary,

          famousHotels,

          famousRestaurants,

          famousPlaces,

          image: destinationImage,

          createdAt:
            new Date(),

        }
      )

      toast.success(
        'Trip saved successfully'
      )

    } catch {

      toast.error(
        'Failed to save trip'
      )

    }

  }

  useEffect(() => {

    if (!tripData?.destination) {
      return
    }

    const fetchLocationData = async () => {
      const fetchPexelsImage = async (query) => {
        try {
          const response = await axios.get(
            'https://api.pexels.com/v1/search',
            {
              headers: {
                Authorization:
                  import.meta.env
                    .VITE_PEXELS_API_KEY,
              },
              params: {
                query,
                per_page: 1,
              },
            }
          )

          return (
            response.data.photos[0]?.src?.large ||
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
          )
        } catch {
          return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
        }
      }

      try {
        const geoRes = await axios.get(
          'https://api.geoapify.com/v1/geocode/search',
          {
            params: {
              text: tripData.destination,
              apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
            },
          }
        )

        const lat = geoRes.data.features[0].properties.lat
        const lon = geoRes.data.features[0].properties.lon

        setCoordinates([lat, lon])

        const cityImage = await fetchPexelsImage(
          `${tripData.destination} tourism`
        )

        setDestinationImage(cityImage)

        const hotelImgs = {}
        const restaurantImgs = {}
        const placeImgs = {}

        for (const hotel of famousHotels || []) {
          hotelImgs[hotel.name] = await fetchPexelsImage(
            `${hotel.name} hotel`
          )
        }

        for (const restaurant of famousRestaurants || []) {
          restaurantImgs[restaurant.name] = await fetchPexelsImage(
            `${restaurant.name} cafe`
          )
        }

        for (const place of famousPlaces || []) {
          placeImgs[place.name] = await fetchPexelsImage(
            `${place.name}`
          )
        }

        setHotelImages(hotelImgs)
        setRestaurantImages(restaurantImgs)
        setPlaceImages(placeImgs)
      } catch {
        console.log('Error fetching location data')
      }
    }

    fetchLocationData()
  }, [
    tripData?.destination,
    famousHotels,
    famousRestaurants,
    famousPlaces,
  ])

  return (

    <div className="bg-[#031025] min-h-screen text-white">

      <div
        className="h-[80vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${destinationImage})`,
        }}
      >

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20">

          <p className="uppercase tracking-[7px] text-orange-400 text-sm">

            Planora AI Travel

          </p>

          <h1 className="text-5xl md:text-7xl font-bold mt-4">

            Explore {tripData.destination}

          </h1>

          <p className="mt-5 text-xl text-gray-300">

            {tripData.startDate} —
            {tripData.endDate}

          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

            <h2 className="text-xl">

              Budget

            </h2>

            <p className="text-4xl font-bold text-orange-400 mt-4">

              ₹{tripData.budget}

            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

            <h2 className="text-xl">

              Travel Type

            </h2>

            <p className="text-4xl font-bold text-orange-400 mt-4">

              {tripData.travelType}

            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

            <h2 className="text-xl">

              Interests

            </h2>

            <p className="text-orange-300 mt-4 leading-8">

              {tripData.interests.join(', ')}

            </p>

          </div>

        </div>

        <div className="mt-20">

          <h2 className="text-5xl font-bold mb-8">

            Destination Map

          </h2>

          <div className="overflow-hidden rounded-3xl">

            <MapContainer
              center={coordinates}
              zoom={12}
              style={{
                height: '500px',
                width: '100%',
              }}
            >

              <ChangeMapView
                center={coordinates}
              />

              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker
                position={coordinates}
              >

                <Popup>

                  {tripData.destination}

                </Popup>

              </Marker>

            </MapContainer>

          </div>

        </div>

        <div className="mt-20">

          <h2 className="text-5xl font-bold mb-10">

            Famous Hotels & Stays

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {famousHotels?.map(
              (hotel, index) => (

                <div
                  key={index}
                  className="bg-white/10 rounded-3xl overflow-hidden"
                >

                  <img
                    src={
                      hotelImages[
                        hotel.name
                      ]
                    }
                    className="h-64 w-full object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">

                      {hotel.name}

                    </h2>

                    <p className="text-gray-300 mt-4 leading-8">

                      {hotel.description}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        <div className="mt-20">

          <h2 className="text-5xl font-bold mb-10">

            Famous Cafes & Restaurants

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {famousRestaurants?.map(
              (
                restaurant,
                index
              ) => (

                <div
                  key={index}
                  className="bg-white/10 rounded-3xl overflow-hidden"
                >

                  <img
                    src={
                      restaurantImages[
                        restaurant.name
                      ]
                    }
                    className="h-64 w-full object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">

                      {restaurant.name}

                    </h2>

                    <p className="text-gray-300 mt-4 leading-8">

                      {restaurant.description}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        <div className="mt-20">

          <h2 className="text-5xl font-bold mb-10">

            Famous Places To Visit

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {famousPlaces?.map(
              (place, index) => (

                <div
                  key={index}
                  className="bg-white/10 rounded-3xl overflow-hidden"
                >

                  <img
                    src={
                      placeImages[
                        place.name
                      ]
                    }
                    className="h-64 w-full object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">

                      {place.name}

                    </h2>

                    <p className="text-gray-300 mt-4 leading-8">

                      {place.description}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        <div className="mt-20">

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

  <h2 className="text-5xl font-bold">

    AI Itinerary

  </h2>

  <div className="flex gap-4">

    <button
      onClick={handleSaveTrip}
      className="bg-white/10 border border-white/20 hover:bg-white/20 px-6 py-3 rounded-xl font-semibold transition-all"
    >

      Save Trip

    </button>

    <button
      onClick={downloadPDF}
      className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-semibold transition-all"
    >

      Download PDF

    </button>

  </div>

</div>

          <div className="space-y-12">

            {
              itinerary &&
              Object.entries(itinerary).map(
                ([day, details]) => (

                  <div
                    key={day}
                    className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl"
                  >

                    <h2 className="text-4xl font-bold text-orange-400 mb-8 capitalize">

                      {day}

                    </h2>

                    <div className="space-y-6 text-lg text-gray-200 leading-9">

                      <p>

                        <span className="font-bold text-white">

                          Title:

                        </span>{' '}

                        {details.title}

                      </p>

                      <p>

                        <span className="font-bold text-white">

                          Morning Plan:

                        </span>{' '}

                        {details.morning}

                      </p>

                      <p>

                        <span className="font-bold text-white">

                          Afternoon Plan:

                        </span>{' '}

                        {details.afternoon}

                      </p>

                      <p>

                        <span className="font-bold text-white">

                          Evening Plan:

                        </span>{' '}

                        {details.evening}

                      </p>

                      <p>

                        <span className="font-bold text-white">

                          Recommended Food:

                        </span>{' '}

                        {details.recommendedFood}

                      </p>

                      <p>

                        <span className="font-bold text-white">

                          Best Photo Spots:

                        </span>{' '}

                        {details.bestPhotoSpots}

                      </p>

                      <p>

                        <span className="font-bold text-white">

                          Shopping Suggestions:

                        </span>{' '}

                        {details.shoppingSuggestions}

                      </p>

                      <p>

                        <span className="font-bold text-white">

                          Transportation:

                        </span>{' '}

                        {details.transportation}

                      </p>

                      <p>

                        <span className="font-bold text-white">

                          Estimated Budget:

                        </span>{' '}

                        {details.estimatedBudget}

                      </p>

                      <p>

                        <span className="font-bold text-white">

                          Travel Tips:

                        </span>{' '}

                        {details.travelTips}

                      </p>

                    </div>

                  </div>

                )
              )
            }

          </div>

        </div>

      </div>

    </div>

  )

}

export default TripResult