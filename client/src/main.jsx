import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Locations from './pages/Locations.jsx'
import LocationDetails from './pages/LocationDetails.jsx'
import AllEvents from './pages/AllEvents.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/locations', element: <Locations /> },
  { path: '/locations/:slug', element: <LocationDetails /> },
   { path: '/events', element: <AllEvents /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
