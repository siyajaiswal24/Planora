import { useState } from 'react'

import {
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { auth } from '../firebase'

import {
  useNavigate,
  Link,
} from 'react-router-dom'

import toast from 'react-hot-toast'

function Login() {

  const navigate =
    useNavigate()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      toast.success(
        'Logged in successfully'
      )

      navigate('/')

    } catch {

      toast.error(
        'Invalid email or password'
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

        onSubmit={handleLogin}

        className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl relative z-10"
      >

        <h1 className="text-5xl font-black text-white text-center">

          Welcome Back

        </h1>

        <p className="text-gray-400 text-center mt-4">

          Login to continue your journeys

        </p>

        <div className="mt-10 space-y-6">

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

          <button

            type="submit"

            disabled={loading}

            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)]"
          >

            {

              loading
                ? 'Logging In...'
                : 'Login'

            }

          </button>

        </div>

        <p className="text-center text-gray-400 mt-8">

          Don’t have an account?{' '}

          <Link
            to="/register"
            className="text-orange-400"
          >

            Register

          </Link>

        </p>

      </form>

    </div>

  )

}

export default Login