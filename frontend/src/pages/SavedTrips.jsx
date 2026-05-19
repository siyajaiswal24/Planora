import { useEffect, useState } from 'react'

import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore'

import { auth, db } from '../firebase'

import toast from 'react-hot-toast'

function SavedTrips() {

  const [trips, setTrips] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchTrips = async () => {

      try {

        if (!auth.currentUser) {

          setLoading(false)

          return

        }

        const q = query(

          collection(db, 'savedTrips'),

          where(
            'userId',
            '==',
            auth.currentUser.uid
          )

        )

        const querySnapshot =
          await getDocs(q)

        const tripsData =
          querySnapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),

            })
          )

        setTrips(tripsData)

      } catch {

        toast.error(
          'Failed to load saved trips'
        )

      } finally {

        setLoading(false)

      }

    }

    fetchTrips()

  }, [])

  const handleDelete =
    async (id) => {

      try {

        await deleteDoc(
          doc(db, 'savedTrips', id)
        )

        setTrips(

          trips.filter(
            (trip) =>
              trip.id !== id
          )

        )

        toast.success(
          'Trip deleted'
        )

      } catch {

        toast.error(
          'Failed to delete'
        )

      }

    }

  return (

    <div className="min-h-screen bg-[#020617] text-white px-6 md:px-16 py-32">

      <h1 className="text-5xl md:text-7xl font-black mb-16">

        Saved Trips

      </h1>

      {

        loading ? (

          <p className="text-gray-400 text-xl">

            Loading trips...

          </p>

        ) : trips.length === 0 ? (

          <p className="text-gray-400 text-xl">

            No saved trips yet.

          </p>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

            {

              trips.map((trip) => (

                <div

                  key={trip.id}

                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] overflow-hidden hover:scale-[1.02] transition-all duration-500"
                >

                  <img

                    src={trip.image}

                    alt="trip"

                    className="w-full h-[220px] object-cover"
                  />

                  <div className="p-7">

                    <h2 className="text-3xl font-bold mb-4">

                      {trip.destination}

                    </h2>

                    <p className="text-gray-400 mb-6">

                      {trip.startDate}
                      {' '} —
                      {' '}
                      {trip.endDate}

                    </p>

                    <button

                      onClick={() =>
                        handleDelete(
                          trip.id
                        )
                      }

                      className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl transition-all"
                    >

                      Delete Trip

                    </button>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  )

}

export default SavedTrips