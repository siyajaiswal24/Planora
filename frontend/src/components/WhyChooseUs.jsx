import { motion } from 'framer-motion'

function WhyPlanora() {

  const features = [

    {
      emoji: '🗺️',
      title: 'Luxury Experiences',
      desc:
        'From hidden gems to iconic destinations, discover journeys designed to feel unforgettable and cinematic.',
    },

    {
      emoji: '🏨',
      title: 'Premium Stays',
      desc:
        'Handpicked hotels, scenic resorts and aesthetic stays perfectly matched to your destination and vibe.',
    },

    {
      emoji: '🍽️',
      title: 'Famous Cafes',
      desc:
        'Explore trending cafes, iconic restaurants and local food spots loved by travelers and creators.',
    },

    {
      emoji: '🌅',
      title: 'Beautiful Memories',
      desc:
        'Capture sunsets, nightlife, beaches, mountains and magical moments worth remembering forever.',
    },

  ]

  return (

    <section className="relative overflow-hidden bg-[#020617] py-32 px-6 md:px-20">

      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-500/20 blur-[140px] rounded-full"></div>

      <motion.div

        initial={{
          opacity: 0,
          y: 60,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 1,
        }}

        viewport={{
          once: true,
        }}

        className="relative z-10 text-center max-w-6xl mx-auto"
      >

        <p className="text-orange-400 uppercase tracking-[10px] text-lg font-semibold">

          Why Choose Planora

        </p>

        <h2 className="mt-8 text-4xl md:text-7xl font-black text-white leading-[1.1]">

          Crafted For
          <br />

          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">

            Modern Travelers

          </span>

        </h2>

        <p className="mt-10 text-gray-300 text-xl leading-10 max-w-4xl mx-auto">

          Planora transforms travel planning into a luxury digital experience —
          helping you discover stunning destinations, premium stays,
          famous cafes and unforgettable adventures effortlessly.

        </p>

      </motion.div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-28">

        {
          features.map((item, index) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 80,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.8,
                delay: index * 0.15,
              }}

              viewport={{
                once: true,
              }}

              whileHover={{
                y: -15,
                scale: 1.03,
              }}

              className="group relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 hover:border-orange-400/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(249,115,22,0.25)]"
            >

              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              <div className="relative z-10">

                <div className="w-24 h-24 rounded-[30px] bg-orange-500/10 flex items-center justify-center text-5xl group-hover:rotate-6 transition-all duration-500">

                  {item.emoji}

                </div>

                <h3 className="mt-10 text-3xl font-bold text-white leading-snug">

                  {item.title}

                </h3>

                <p className="mt-6 text-gray-400 text-lg leading-9">

                  {item.desc}

                </p>

              </div>

            </motion.div>

          ))
        }

      </div>

    </section>

  )

}

export default WhyPlanora