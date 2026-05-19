import { useEffect, useState } from 'react'

import PlannerForm from '../components/PlannerForm'

import beach from '../assets/beach.jpeg'
import hotel from '../assets/hotel.jpeg'
import beach2 from '../assets/beach2.jpeg'
import snow from '../assets/snow.jpeg'
import forest from '../assets/forest.jpeg'

function Planner() {

  const images = [
    beach,
    hotel,
    beach2,
    snow,
    forest,
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) =>
        (prev + 1) % images.length
      )

    }, 5000)

    return () => clearInterval(interval)

  }, [images.length])

  return (

    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >

      <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]"></div>

      <div className="relative z-10 w-full flex justify-center">

        <PlannerForm />

      </div>

    </section>

  )
}

export default Planner