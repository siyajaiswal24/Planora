import { motion } from 'framer-motion'

const destinations = [

  {

    name: 'Goa',

    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',

    tagline:
      'Beaches, nightlife & sunsets',

  },

  {

    name: 'Kashmir',

    image:
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d',

    tagline:
      'Heaven in the mountains',

  },

  {

    name: 'Bali',

    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4',

    tagline:
      'Tropical paradise escapes',

  },

  {

    name: 'Paris',

    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',

    tagline:
      'Romantic city adventures',

  },

  {

    name: 'Dubai',

    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',

    tagline:
      'Luxury & futuristic vibes',

  },

  {

    name: 'Jaipur',

    image:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245',

    tagline:
      'Royal palaces & culture',

  },

]

function PopularDestinations() {

  return (

    <section className="bg-[#020617] px-8 md:px-20 py-28">

      <div className="flex items-center justify-between mb-14">

        <div>

          <p className="text-orange-400 uppercase tracking-[4px] text-sm">

            Explore

          </p>

          <h2 className="text-5xl font-bold text-white mt-3">

            Popular Destinations

          </h2>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {

          destinations.map(
            (
              destination,
              index
            ) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay:
                    index * 0.1,
                }}
                whileHover={{
                  scale: 1.03,
                }}
                className="relative overflow-hidden rounded-[35px] group cursor-pointer"
              >

                <img
                  src={
                    destination.image
                  }
                  alt={
                    destination.name
                  }
                  className="h-[450px] w-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-0 p-8">

                  <h3 className="text-4xl font-bold text-white">

                    {
                      destination.name
                    }

                  </h3>

                  <p className="text-gray-300 mt-3 text-lg">

                    {
                      destination.tagline
                    }

                  </p>

                </div>

              </motion.div>

            )
          )

        }

      </div>

    </section>

  )

}

export default PopularDestinations