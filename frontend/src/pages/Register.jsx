import { useState } from 'react'

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

import { auth } from '../firebase'

import {
  useNavigate,
  Link,
} from 'react-router-dom'

import toast from 'react-hot-toast'

function Register() {

  const navigate =
    useNavigate()

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [confirmPassword,
    setConfirmPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleRegister =
    async (e) => {

      e.preventDefault()

      if (
        password !== confirmPassword
      ) {

        toast.error(
          'Passwords do not match'
        )

        return

      }

      try {

        setLoading(true)

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          )

        await updateProfile(
          userCredential.user,
          {
            displayName: name,
          }
        )

        toast.success(
          'Account created successfully'
        )

        navigate('/')

      } catch {

        toast.error(
          'Failed to create account'
        )

      } finally {

        setLoading(false)

      }

    }

  return (

    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[140px] rounded-full top-[-150px] left-[-100px]"></div>

      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[140px] rounded-full bottom-[-100px] right-[-100px]"></div>

      <form

        onSubmit={handleRegister}

        className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl relative z-10"
      >

        <h1 className="text-5xl font-black text-white text-center">

          Create Account

        </h1>

        <p className="text-gray-400 text-center mt-4">

          Start planning unforgettable trips

        </p>

        <div className="mt-10 space-y-6">

          <input

            type="text"

            placeholder="Full Name"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <input

            type="email"

            placeholder="Email Address"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <input

            type="password"

            placeholder="Confirm Password"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <button

            type="submit"

            disabled={loading}

            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)]"
          >

            {

              loading
                ? 'Creating Account...'
                : 'Register'

            }

          </button>

        </div>

        <p className="text-center text-gray-400 mt-8">

          Already have an account?{' '}

          <Link
            to="/login"
            className="text-orange-400"
          >

            Login

          </Link>

        </p>

      </form>

    </div>

  )

}

export default Register