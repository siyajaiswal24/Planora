import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { DateRange } from 'react-date-range'

import { format } from 'date-fns'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function PlannerForm() {

  const cities = [
    'Delhi',
    'Mumbai',
    'Goa',
    'Manali',
    'Dehradun',
    'Kashmir',
    'Jaipur',
    'Bali',
    'Paris',
    'Dubai',
  ]

  const interestsData = [
    'Mountains',
    'Beaches',
    'Adventure',
    'Food',
    'Nightlife',
    'Culture',
  ]

  const [from, setFrom] =
    useState('')

  const [
    destination,
    setDestination,
  ] = useState('')

  const [
    showFromSuggestions,
    setShowFromSuggestions,
  ] = useState(false)

  const [
    showDestinationSuggestions,
    setShowDestinationSuggestions,
  ] = useState(false)

  const [budget, setBudget] =
    useState('20000')

  const [
    travelType,
    setTravelType,
  ] = useState('Solo')

  const [
    selectedInterests,
    setSelectedInterests,
  ] = useState([])

  const [
    showCalendar,
    setShowCalendar,
  ] = useState(false)

  const [loading, setLoading] =
    useState(false)

  const navigate =
    useNavigate()

  const [date, setDate] =
    useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ])

  const filteredFromCities =
    cities.filter((city) =>
      city
        .toLowerCase()
        .includes(
          from.toLowerCase()
        )
    )

  const filteredDestinationCities =
    cities.filter((city) =>
      city
        .toLowerCase()
        .includes(
          destination.toLowerCase()
        )
    )

  const toggleInterest = (
    interest
  ) => {

    if (
      selectedInterests.includes(
        interest
      )
    ) {

      setSelectedInterests(
        selectedInterests.filter(
          (item) =>
            item !== interest
        )
      )

    } else {

      setSelectedInterests([
        ...selectedInterests,
        interest,
      ])

    }

  }

  const handleGenerateTrip =
    async () => {

      if (
        !from ||
        !destination
      ) {

        alert(
          'Please fill all fields'
        )

        return

      }

      const tripData = {

        from,

        destination,

        startDate: format(
          date[0].startDate,
          'dd MMM yyyy'
        ),

        endDate: format(
          date[0].endDate,
          'dd MMM yyyy'
        ),

        budget,

        travelType,

        interests:
          selectedInterests,

      }

      try {

        setLoading(true)

        const response =
          await fetch(`${API_BASE}/generate-trip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tripData),
          })

        const data =
          await response.json()

        console.log(data)

        if (!response.ok) {
          alert(
            data?.error?.message ||
            data?.error ||
            'Trip generation failed'
          )
          setLoading(false)
          return
        }

        if (
          !data ||
          !data.itinerary
        ) {

          alert(
            'Trip generation failed'
          )

          setLoading(false)

          return

        }

        navigate(
          '/trip-result',
          {

            state: {

              tripData,

              itinerary:
                data.itinerary ||
                {},

              famousHotels:
                data.famousHotels ||
                [],

              famousRestaurants:
                data.famousRestaurants ||
                [],

              famousPlaces:
                data.famousPlaces ||
                [],

            },

          }
        )

        setLoading(false)

      } catch (error) {

        console.log(error)

        alert(
          'Something went wrong'
        )

        setLoading(false)

      }

    }

  return (

    <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-10 shadow-2xl">

      <h2 className="text-5xl font-bold text-white text-center">

        Plan Your Dream Journey

      </h2>

      <p className="text-gray-200 text-center mt-5 text-lg">

        AI-powered trip planning with hotels, restaurants, maps and detailed itineraries.

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

        <div className="relative">

          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => {

              setFrom(
                e.target.value
              )

              setShowFromSuggestions(
                true
              )

            }}
            className="w-full bg-white/20 border border-white/20 text-white placeholder:text-gray-300 p-5 rounded-2xl outline-none"
          />

          {

            showFromSuggestions &&
              from && (

                <div className="absolute top-full left-0 w-full bg-white rounded-2xl mt-2 overflow-hidden z-50 shadow-xl">

                  {

                    filteredFromCities.map(
                      (
                        city,
                        index
                      ) => (

                        <div
                          key={
                            index
                          }
                          onClick={() => {

                            setFrom(
                              city
                            )

                            setShowFromSuggestions(
                              false
                            )

                          }}
                          className="p-4 hover:bg-gray-100 cursor-pointer text-gray-800"
                        >

                          {city}

                        </div>

                      )
                    )

                  }

                </div>

              )

          }

        </div>

        <div className="relative">

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => {

              setDestination(
                e.target.value
              )

              setShowDestinationSuggestions(
                true
              )

            }}
            className="w-full bg-white/20 border border-white/20 text-white placeholder:text-gray-300 p-5 rounded-2xl outline-none"
          />

          {

            showDestinationSuggestions &&
              destination && (

                <div className="absolute top-full left-0 w-full bg-white rounded-2xl mt-2 overflow-hidden z-50 shadow-xl">

                  {

                    filteredDestinationCities.map(
                      (
                        city,
                        index
                      ) => (

                        <div
                          key={
                            index
                          }
                          onClick={() => {

                            setDestination(
                              city
                            )

                            setShowDestinationSuggestions(
                              false
                            )

                          }}
                          className="p-4 hover:bg-gray-100 cursor-pointer text-gray-800"
                        >

                          {city}

                        </div>

                      )
                    )

                  }

                </div>

              )

          }

        </div>

      </div>

      <div
        onClick={() =>
          setShowCalendar(
            !showCalendar
          )
        }
        className="mt-6 bg-white/20 border border-white/20 text-white p-5 rounded-2xl cursor-pointer"
      >

        {

          `${format(
            date[0].startDate,
            'dd MMM yyyy'
          )} - ${format(
            date[0].endDate,
            'dd MMM yyyy'
          )}`

        }

      </div>

      {

        showCalendar && (

          <div className="mt-6 overflow-hidden rounded-3xl">

            <DateRange
              editableDateInputs={
                true
              }
              onChange={(
                item
              ) => {

                setDate([
                  item.selection,
                ])

              }}
              moveRangeOnFirstSelection={
                false
              }
              ranges={date}
            />

          </div>

        )

      }

      <div className="mt-8">

        <label className="text-white text-lg">

          Budget

        </label>

        <div className="flex flex-col gap-4 mt-4">

          <input
            type="number"
            placeholder="Enter your budget"
            value={budget}
            onChange={(e) =>
              setBudget(
                e.target.value
              )
            }
            className="w-full bg-white/20 border border-white/20 text-white placeholder:text-gray-300 p-5 rounded-2xl outline-none"
          />

          <input
            type="range"
            min="1000"
            max="500000"
            step="5000"
            value={budget}
            onChange={(e) =>
              setBudget(
                e.target.value
              )
            }
            className="w-full"
          />

        </div>

      </div>

      <div className="mt-8">

        <label className="text-white text-lg">

          Travel Type

        </label>

        <select
          value={travelType}
          onChange={(e) =>
            setTravelType(
              e.target.value
            )
          }
          className="w-full mt-4 bg-white/20 border border-white/20 text-white p-5 rounded-2xl outline-none"
        >

          <option>
            Solo
          </option>

          <option>
            Couple
          </option>

          <option>
            Friends
          </option>

          <option>
            Family
          </option>

        </select>

      </div>

      <div className="mt-8">

        <label className="text-white text-lg">

          Interests

        </label>

        <div className="flex flex-wrap gap-4 mt-4">

          {

            interestsData.map(
              (
                interest,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    toggleInterest(
                      interest
                    )
                  }
                  className={`px-6 py-3 rounded-full transition-all ${
                    selectedInterests.includes(
                      interest
                    )
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/20 text-white'
                  }`}
                >

                  {interest}

                </button>

              )
            )

          }

        </div>

      </div>

      <button
        onClick={
          handleGenerateTrip
        }
        disabled={loading}
        className="w-full mt-10 bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl text-lg font-semibold transition-all shadow-xl"
      >

        {

          loading
            ? 'Generating AI Trip...'
            : 'Generate AI Itinerary'

        }

      </button>

    </div>

  )

}

export default PlannerForm