import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'

import Planner from './pages/Planner'

import TripResult from './pages/TripResult'

import Login from './pages/Login'

import Register from './pages/Register'

import SavedTrips from './pages/SavedTrips'

function App() {

  return (

    <BrowserRouter>

      <Toaster
        position="top-right"
      />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/planner"
          element={<Planner />}
        />

        <Route
          path="/trip-result"
          element={<TripResult />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
  path="/saved-trips"
  element={<SavedTrips />}
/>

      </Routes>

    </BrowserRouter>

  )

}

export default App