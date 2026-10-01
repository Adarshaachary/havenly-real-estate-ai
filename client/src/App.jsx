import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import Favorites from './pages/Favorites'
import Bookings from './pages/Bookings'
import AddProperty from './pages/AddProperty'
import Login from './pages/Login'
import Register from './pages/Register'

function AppContent() {
  const location = useLocation()

  // Authentication pages should have a clean standalone layout
  const isAuthPage =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register'

  // Chatbot should appear ONLY on the Properties page
  const showChatbot =
    location.pathname === '/properties'

  return (
    <div className="app-shell">
      {!isAuthPage && <Navbar />}

      <main>
        <Routes>
          {/* Login page opens first when localhost is opened */}
          <Route path="/" element={<Login />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main Havenly website */}
          <Route path="/home" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route
            path="/add-property"
            element={<AddProperty />}
          />
        </Routes>
      </main>

      {/* Chatbot appears ONLY on the Properties page */}
      {showChatbot && <Chatbot />}

      {!isAuthPage && <Footer />}
    </div>
  )
}

export default function App() {
  return <AppContent />
}