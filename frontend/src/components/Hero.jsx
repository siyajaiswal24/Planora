import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

import beach from '../assets/beach.jpeg'
import hotel from '../assets/hotel.jpeg'
import beach2 from '../assets/beach2.jpeg'
import snow from '../assets/snow.jpeg'
import forest from '../assets/forest.jpeg'

function Hero() {

  const navigate = useNavigate()

  const images = [
    beach,
    hotel,
    beach2,
    snow,
    forest,
  ]

  const [currentImage, setCurrentImage] =
    useState(0)

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) =>
        (prev + 1) % images.length
      )

    }, 5000)

    return () => clearInterval(interval)

  }, [images.length])

  return (

    <section className="relative h-screen overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center scale-110 animate-[slowZoom_12s_linear_infinite]"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#020617]"></div>

      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-orange-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-pink-500/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <motion.p

          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 1,
          }}

          className="uppercase tracking-[10px] text-orange-400 text-sm md:text-base font-semibold"
        >

          Luxury Travel Experiences

        </motion.p>

        <motion.h1

          initial={{
            opacity: 0,
            y: 60,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 1,
            delay: 0.2,
          }}

          className="mt-8 text-6xl md:text-8xl font-black text-white leading-[1.05] max-w-6xl"
        >

          Travel Smarter,
          <br />

          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">

            Explore Better

          </span>

        </motion.h1>

        <motion.p

          initial={{
            opacity: 0,
            y: 50,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 1,
            delay: 0.4,
          }}

          className="mt-10 text-gray-200 text-lg md:text-2xl leading-10 max-w-3xl"
        >

          Discover famous destinations, luxury stays,
          hidden cafes and unforgettable journeys —
          perfectly curated for modern travelers.

        </motion.p>

        <motion.div

          initial={{
            opacity: 0,
            y: 60,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 1,
            delay: 0.6,
          }}

          className="flex flex-col md:flex-row gap-6 mt-14"
        >

          <button

            onClick={() =>
              navigate('/planner')
            }

            className="relative overflow-hidden bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(249,115,22,0.5)]"
          >

            Start Planning

          </button>

          <button className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-105">

            Discover Places

          </button>

        </motion.div>

        <motion.div

          animate={{
            y: [0, 12, 0],
          }}

          transition={{
            repeat: Infinity,
            duration: 2,
          }}

          className="absolute bottom-10"
        >

          <div className="w-8 h-14 border-2 border-white/50 rounded-full flex justify-center">

            <div className="w-2 h-2 bg-white rounded-full mt-3"></div>

          </div>

        </motion.div>

      </div>

      <style>

        {`

          @keyframes slowZoom {

            0% {
              transform: scale(1);
            }

            100% {
              transform: scale(1.12);
            }

          }

        `}

      </style>

    </section>

  )

}

export default Hero