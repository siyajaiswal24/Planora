import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

import { auth } from '../firebase'

import toast from 'react-hot-toast'

function Navbar() {

  const navigate =
    useNavigate()

  const [scrolled, setScrolled] =
    useState(false)

  const [user, setUser] =
    useState(null)

  const [dropdown, setDropdown] =
    useState(false)

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser)

        }
      )

    return () => unsubscribe()

  }, [])

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 50) {

        setScrolled(true)

      } else {

        setScrolled(false)

      }

    }

    window.addEventListener(
      'scroll',
      handleScroll
    )

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )

  }, [])

  const handleLogout =
    async () => {

      await signOut(auth)

      toast.success(
        'Logged out successfully'
      )

      navigate('/')

    }

  const getInitials = () => {

    if (!user?.displayName)
      return 'U'

    return user.displayName
      .split(' ')
      .map((word) =>
        word[0]
      )
      .join('')
      .slice(0, 2)
      .toUpperCase()

  }

  return (

    <motion.nav

      initial={{
        y: -100,
      }}

      animate={{
        y: 0,
      }}

      transition={{
        duration: 0.8,
      }}

      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#020617]/70 backdrop-blur-2xl border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >

      <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between">

        <motion.div

          whileHover={{
            scale: 1.05,
          }}

          onClick={() =>
            navigate('/')
          }

          className="flex items-center gap-3 cursor-pointer"
        >

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-2xl shadow-[0_0_30px_rgba(249,115,22,0.5)]">

            ✈️

          </div>

          <h1 className="text-3xl font-black text-white tracking-wide">

            Planora

          </h1>

        </motion.div>

        <div className="hidden md:flex items-center gap-12">

          <button
            onClick={() =>
              navigate('/planner')
            }
            className="text-white hover:text-orange-400 transition-all"
          >

            Plan Trip

          </button>

          <Link
  to="/saved-trips"
  className="text-white hover:text-orange-400 transition-all"
>

  Saved Trips

</Link>

          <button
            className="text-white hover:text-orange-400 transition-all"
          >

            Feedback

          </button>

        </div>

        {

          user ? (

            <div className="relative">

              <button

                onClick={() =>
                  setDropdown(
                    !dropdown
                  )
                }

                className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)]"
              >

                {getInitials()}

              </button>

              {

                dropdown && (

                  <div className="absolute right-0 mt-4 w-48 bg-[#0f172a] border border-white/10 rounded-2xl p-3 shadow-2xl">

                    <button

                      onClick={
                        handleLogout
                      }

                      className="w-full text-left text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all"
                    >

                      Logout

                    </button>

                  </div>

                )

              }

            </div>

          ) : (

            <button

              onClick={() =>
                navigate('/login')
              }

              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-base font-semibold transition-all duration-500 shadow-[0_0_40px_rgba(249,115,22,0.4)]"
            >

              Login

            </button>

          )

        }

      </div>

    </motion.nav>

  )

}

export default Navbar