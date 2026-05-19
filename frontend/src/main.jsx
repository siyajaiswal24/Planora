import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'leaflet/dist/leaflet.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)