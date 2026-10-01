import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Sparkles,
  Video,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import LoadingSpinner from '../components/LoadingSpinner'
import { getProperty } from '../services/propertyService'
import {
  bookVisit,
  getFavorites,
  toggleFavorite,
} from '../services/userService'

export default function PropertyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [property, setProperty] = useState(null)
  const [saved, setSaved] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  // =========================================================
  // BOOKING STATE
  // =========================================================

  const [showBooking, setShowBooking] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [calendarMonth, setCalendarMonth] = useState(new Date())
  const [bookingError, setBookingError] = useState('')

  useEffect(() => {
    getProperty(id).then((item) => {
      setProperty(item)

      if (item) {
        setSaved(getFavorites().includes(item.id))
      }
    })
  }, [id])

  const images = useMemo(() => {
    if (!property) return []

    if (Array.isArray(property.images) && property.images.length > 0) {
      return property.images
    }

    return property.image ? [property.image] : []
  }, [property])

  useEffect(() => {
    if (activeImage >= images.length) {
      setActiveImage(0)
    }
  }, [images.length, activeImage])

  if (!property) {
    return <LoadingSpinner />
  }

  const facilities = property.facilities || {}

  const formattedPrice = new Intl.NumberFormat('en-IN').format(
    property.price || 0
  )

  const locationText = [property.address, property.city]
    .filter(Boolean)
    .join(', ')

  // =========================================================
  // MAP LOCATION
  // =========================================================
  // Use the latitude and longitude stored in the database.
  // This prevents OpenStreetMap from guessing the location
  // from the property title/address.
  // =========================================================

  const latitude = Number(property.latitude)
  const longitude = Number(property.longitude)

  const hasCoordinates =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180

  // Small area around the stored coordinate.
  // This keeps the property location visible without zooming
  // too far away from the area.
  const mapDelta = 0.015

  const mapQuery = encodeURIComponent(
    locationText || property.city || property.title
  )

  const mapUrl = hasCoordinates
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${
        longitude - mapDelta
      },${
        latitude - mapDelta
      },${
        longitude + mapDelta
      },${
        latitude + mapDelta
      }&layer=mapnik&marker=${latitude},${longitude}`
    : `https://www.openstreetmap.org/export/embed.html?search=${mapQuery}`

  const exploreMapUrl = hasCoordinates
    ? `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`
    : `https://www.openstreetmap.org/search?query=${mapQuery}`

  // =========================================================
  // NEARBY PLACES
  // =========================================================
  // Supports both:
  //
  // 1. Array:
  //    ["Metro Station", "Hospital", "School"]
  //
  // 2. Object:
  //    {
  //      metro: "JP Nagar Metro Station",
  //      school: "Brigade School",
  //      hospital: "Apollo Hospitals"
  //    }
  // =========================================================

  const nearbyPlaces = useMemo(() => {
    if (!property?.nearbyPlaces) {
      return []
    }

    if (Array.isArray(property.nearbyPlaces)) {
      return property.nearbyPlaces
        .map((place) => {
          if (typeof place === 'string') {
            return place
          }

          if (place && typeof place === 'object') {
            return place.name || place.title || ''
          }

          return ''
        })
        .filter(Boolean)
        .slice(0, 3)
    }

    if (
      typeof property.nearbyPlaces === 'object' &&
      property.nearbyPlaces !== null
    ) {
      return Object.values(property.nearbyPlaces)
        .map((place) => {
          if (typeof place === 'string') {
            return place
          }

          if (place && typeof place === 'object') {
            return place.name || place.title || ''
          }

          return ''
        })
        .filter(Boolean)
        .slice(0, 3)
    }

    return []
  }, [property])

  // =========================================================
  // FAVORITE
  // =========================================================

  const save = () => {
    const updatedFavorites = toggleFavorite(property.id)
    setSaved(updatedFavorites.includes(property.id))
  }

  // =========================================================
  // BOOKING
  // =========================================================

  const openBooking = () => {
    setShowBooking(true)
    setBookingError('')

    // Start calendar from current month
    setCalendarMonth(new Date())

    // Clear previous selection
    setSelectedDate(null)
    setSelectedTime('')
  }

  const closeBooking = () => {
    setShowBooking(false)
    setBookingError('')
  }

  const confirmBooking = () => {
    if (!selectedDate) {
      setBookingError('Please select a visit date.')
      return
    }

    if (!selectedTime) {
      setBookingError('Please select a preferred time.')
      return
    }

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')

    const bookingDate = `${year}-${month}-${day}`

    bookVisit(property, bookingDate, selectedTime)

    closeBooking()

    navigate('/bookings')
  }

  // =========================================================
  // CALENDAR HELPERS
  // =========================================================

  const today = new Date()

  const isSameDay = (dateOne, dateTwo) => {
    if (!dateOne || !dateTwo) return false

    return (
      dateOne.getFullYear() === dateTwo.getFullYear() &&
      dateOne.getMonth() === dateTwo.getMonth() &&
      dateOne.getDate() === dateTwo.getDate()
    )
  }

  const isPastDate = (date) => {
    const checkDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )

    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )

    return checkDate < currentDate
  }

  const getCalendarDays = () => {
    const year = calendarMonth.getFullYear()
    const month = calendarMonth.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const previousMonthDays = new Date(year, month, 0).getDate()

    const days = []

    // Previous month's visible days
    for (let index = firstDay - 1; index >= 0; index--) {
      days.push({
        date: new Date(year, month - 1, previousMonthDays - index),
        currentMonth: false,
      })
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        currentMonth: true,
      })
    }

    // Next month's visible days
    let nextDay = 1

    while (days.length < 42) {
      days.push({
        date: new Date(year, month + 1, nextDay),
        currentMonth: false,
      })

      nextDay++
    }

    return days
  }

  const calendarDays = getCalendarDays()

  const monthTitle = calendarMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const goPreviousMonth = () => {
    const previousMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() - 1,
      1
    )

    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )

    if (previousMonth < currentMonthStart) {
      return
    }

    setCalendarMonth(previousMonth)
  }

  const goNextMonth = () => {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + 1,
        1
      )
    )
  }

  const selectDate = (date, currentMonth) => {
    if (!currentMonth || isPastDate(date)) {
      return
    }

    setSelectedDate(date)
    setBookingError('')
  }

  const formatSelectedDate = () => {
    if (!selectedDate) return 'Select a date'

    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }

  // =========================================================
  // SHARE
  // =========================================================

  const shareProperty = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out ${property.title} on Havenly.`,
          url,
        })

        return
      } catch {
        // User closed the share dialog.
      }
    }

    try {
      await navigator.clipboard?.writeText(url)
      alert('Property link copied.')
    } catch {
      alert('Unable to copy the property link.')
    }
  }

  // =========================================================
  // GALLERY
  // =========================================================

  const nextImage = () => {
    if (images.length <= 1) return

    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    )
  }

  const previousImage = () => {
    if (images.length <= 1) return

    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    )
  }

  const currentImage =
    images[activeImage] ||
    property.image ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80'

  return (
    <main className="detail-page">
      <div className="detail-container">

        {/* =====================================================
            BACK
            ===================================================== */}

        <Link className="back-link" to="/properties">
          <ArrowLeft size={16} />
          Back to properties
        </Link>

        {/* =====================================================
            IMAGE GALLERY
            ===================================================== */}

        <section className="detail-gallery">

          <div className="detail-main-image">

            <img
              src={currentImage}
              alt={property.title}
            />

            <div className="detail-image-overlay" />

            <div className="detail-image-top">

              <span className="detail-property-tag">
                {property.type || property.propertyType || 'Residence'}
              </span>

              <button
                className={`detail-gallery-save ${
                  saved ? 'is-saved' : ''
                }`}
                onClick={save}
                aria-label="Save property"
              >
                <Heart
                  size={18}
                  fill={saved ? 'currentColor' : 'none'}
                />
              </button>

            </div>

            {images.length > 1 && (
              <>
                <button
                  className="gallery-arrow gallery-arrow-left"
                  onClick={previousImage}
                  aria-label="Previous image"
                >
                  <ArrowLeft size={17} />
                </button>

                <button
                  className="gallery-arrow gallery-arrow-right"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ArrowRight size={17} />
                </button>

                <div className="gallery-counter">
                  {activeImage + 1} / {images.length}
                </div>
              </>
            )}

            <div className="detail-image-caption">
              <span>Featured residence</span>
              <strong>{property.title}</strong>
            </div>

          </div>

          {images.length > 1 && (
            <div className="detail-thumbnails">

              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={`detail-thumbnail ${
                    activeImage === index ? 'active' : ''
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                  />
                </button>
              ))}

            </div>
          )}

        </section>

        {/* =====================================================
            PROPERTY INFORMATION
            ===================================================== */}

        <section className="detail-information">

          <div className="detail-main-information">

            <div className="detail-location">

              <MapPin size={15} />

              <span>
                {locationText || 'Location available on request'}
              </span>

            </div>

            <h1>{property.title}</h1>

            <p className="detail-description">
              {property.description ||
                'A thoughtfully designed residence with comfortable spaces and a convenient location.'}
            </p>

            <div className="detail-price-row">

              <div className="detail-price">
                ₹{formattedPrice}
                <span>asking price</span>
              </div>

              <button
                className="detail-share"
                onClick={shareProperty}
                aria-label="Share property"
              >
                <Share2 size={17} />
                Share
              </button>

            </div>

            {/* =================================================
                PROPERTY STATS
                ================================================= */}

            <div className="detail-stats">

              <div className="detail-stat">
                <strong>
                  {facilities.bedrooms || '-'}
                </strong>
                <span>Bedrooms</span>
              </div>

              <div className="detail-stat">
                <strong>
                  {facilities.bathrooms || '-'}
                </strong>
                <span>Bathrooms</span>
              </div>

              <div className="detail-stat">
                <strong>
                  {facilities.parking || '-'}
                </strong>
                <span>Parking</span>
              </div>

              <div className="detail-stat">
                <strong>
                  {property.area || facilities.area || '-'}
                </strong>
                <span>Area</span>
              </div>

            </div>

            {/* =================================================
                ACTIONS
                ================================================= */}

            <div className="detail-actions">

              <button
                className="primary-button detail-book-button"
                onClick={openBooking}
              >
                <CalendarDays size={17} />
                Book a visit
              </button>

              <button
                className={`secondary-button ${
                  saved ? 'is-saved' : ''
                }`}
                onClick={save}
              >
                <Heart
                  size={17}
                  fill={saved ? 'currentColor' : 'none'}
                />

                {saved ? 'Saved' : 'Save property'}
              </button>

            </div>

          </div>

          {/* =====================================================
              AI CARD
              ===================================================== */}

          <aside className="detail-ai-card">

            <div className="detail-ai-header">

              <div className="detail-ai-icon">
                <Sparkles size={16} />
              </div>

              <div>
                <strong>Havenly AI</strong>
                <span>Property assistant</span>
              </div>

              <span className="detail-ai-status">
                <span />
                Online
              </span>

            </div>

            <div className="detail-ai-body">

              <p>
                Have questions about this property?
                Ask Havenly AI about the location, property,
                budget or your visit.
              </p>

              <Link
                to="/"
                className="detail-ai-button"
              >
                Ask Havenly AI
                <ArrowRight size={15} />
              </Link>

            </div>

          </aside>

        </section>

        {/* =====================================================
            CUSTOM BOOKING PANEL
            ===================================================== */}

        {showBooking && (
          <div
            className="havenly-booking-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeBooking()
              }
            }}
          >

            <div className="havenly-booking-panel">

              {/* HEADER */}

              <div className="havenly-booking-header">

                <div>
                  <span className="havenly-booking-eyebrow">
                    Schedule a visit
                  </span>

                  <h2>
                    See it in person.
                  </h2>

                  <p>
                    Choose a convenient date and time for your
                    property visit.
                  </p>
                </div>

                <button
                  className="havenly-booking-close"
                  onClick={closeBooking}
                  aria-label="Close booking"
                >
                  <X size={18} />
                </button>

              </div>

              {/* PROPERTY SUMMARY */}

              <div className="havenly-booking-property">

                <img
                  src={currentImage}
                  alt={property.title}
                />

                <div>
                  <span>VISITING</span>

                  <strong>
                    {property.title}
                  </strong>

                  <p>
                    <MapPin size={12} />
                    {locationText || property.city}
                  </p>
                </div>

              </div>

              {/* CALENDAR */}

              <div className="havenly-booking-calendar">

                <div className="havenly-calendar-header">

                  <div>
                    <span>SELECT DATE</span>
                    <strong>{monthTitle}</strong>
                  </div>

                  <div className="havenly-calendar-navigation">

                    <button
                      type="button"
                      onClick={goPreviousMonth}
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={goNextMonth}
                      aria-label="Next month"
                    >
                      <ChevronRight size={17} />
                    </button>

                  </div>

                </div>

                <div className="havenly-calendar-weekdays">

                  {[
                    'SUN',
                    'MON',
                    'TUE',
                    'WED',
                    'THU',
                    'FRI',
                    'SAT',
                  ].map((day) => (
                    <span key={day}>
                      {day}
                    </span>
                  ))}

                </div>

                <div className="havenly-calendar-grid">

                  {calendarDays.map(({ date, currentMonth }, index) => {

                    const disabled =
                      !currentMonth || isPastDate(date)

                    const selected =
                      selectedDate &&
                      isSameDay(date, selectedDate)

                    const isToday =
                      isSameDay(date, today)

                    return (
                      <button
                        key={`${date.toISOString()}-${index}`}
                        type="button"
                        className={[
                          'havenly-calendar-day',
                          !currentMonth ? 'outside-month' : '',
                          disabled ? 'disabled' : '',
                          selected ? 'selected' : '',
                          isToday ? 'today' : '',
                        ].join(' ')}
                        disabled={disabled}
                        onClick={() =>
                          selectDate(date, currentMonth)
                        }
                      >
                        <span>
                          {date.getDate()}
                        </span>

                        {isToday && currentMonth && (
                          <small>Today</small>
                        )}
                      </button>
                    )
                  })}

                </div>

              </div>

              {/* SELECTED DATE */}

              <div className="havenly-selected-date">

                <div className="havenly-selected-date-icon">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <span>YOUR VISIT</span>

                  <strong>
                    {formatSelectedDate()}
                  </strong>
                </div>

                {selectedDate && (
                  <Check size={17} />
                )}

              </div>

              {/* TIME */}

              <div className="havenly-time-section">

                <div className="havenly-time-heading">
                  <span>SELECT TIME</span>
                  <small>
                    Choose your preferred slot
                  </small>
                </div>

                <div className="havenly-time-grid">

                  {[
                    '09:00 AM',
                    '10:30 AM',
                    '12:00 PM',
                    '02:00 PM',
                    '03:30 PM',
                    '05:00 PM',
                  ].map((time) => (
                    <button
                      type="button"
                      key={time}
                      className={
                        selectedTime === time
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        setSelectedTime(time)
                        setBookingError('')
                      }}
                    >
                      {selectedTime === time && (
                        <Check size={13} />
                      )}

                      {time}
                    </button>
                  ))}

                </div>

              </div>

              {/* ERROR */}

              {bookingError && (
                <div className="havenly-booking-error">
                  {bookingError}
                </div>
              )}

              {/* FOOTER */}

              <div className="havenly-booking-footer">

                <button
                  type="button"
                  className="havenly-booking-cancel"
                  onClick={closeBooking}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="havenly-booking-confirm"
                  onClick={confirmBooking}
                >
                  Confirm visit
                  <ArrowRight size={15} />
                </button>

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            LOWER INFORMATION
            ===================================================== */}

        <section className="detail-lower">

          {/* ===================================================
              ABOUT PROPERTY
              =================================================== */}

          <div className="detail-about">

            <div className="detail-section-heading">
              <span>01</span>
              <p>About this property</p>
            </div>

            <h2>
              A place designed
              <br />
              <em>for everyday living.</em>
            </h2>

            <p>
              {property.description ||
                'Explore this residence and discover the spaces, surroundings and features that make it worth a closer look.'}
            </p>

            <div className="detail-features">

              {[
                'Comfortable living spaces',
                'Convenient location',
                'Parking available',
                'Suitable for families',
              ].map((feature) => (
                <div
                  className="detail-feature"
                  key={feature}
                >
                  <Check size={14} />
                  <span>{feature}</span>
                </div>
              ))}

            </div>

          </div>

          {/* ===================================================
              CUSTOM HAVENLY MAP
              =================================================== */}

          <div className="detail-map-section">

            <div className="detail-section-heading">
              <span>02</span>
              <p>Property location</p>
            </div>

            <div className="havenly-map">

              {/* =================================================
                  ACCURATE COORDINATE-BASED MAP
                  ================================================= */}

              <iframe
                title={`Map showing ${property.title}`}
                src={mapUrl}
                loading="lazy"
              />

              <div className="havenly-map-overlay" />

              <div className="havenly-map-top">

                <div className="havenly-map-location">
                  <MapPin size={14} />

                  <span>
                    {property.city || 'Location'}
                  </span>
                </div>

                <div className="havenly-map-live">
                  <span />

                  {hasCoordinates
                    ? 'Location verified'
                    : 'Location'}
                </div>

              </div>

              {/* =================================================
                  PROPERTY MARKER
                  ================================================= */}

              <div className="havenly-property-marker">

                <div className="havenly-marker-pulse" />

                <div className="havenly-marker-icon">
                  <MapPin size={19} />
                </div>

              </div>

              {/* =================================================
                  PROPERTY CARD ON MAP
                  ================================================= */}

              <div className="havenly-map-card">

                <div className="havenly-map-card-image">

                  <img
                    src={
                      property.image ||
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80'
                    }
                    alt={property.title}
                  />

                </div>

                <div className="havenly-map-card-content">

                  <span className="havenly-map-card-label">
                    YOUR PROPERTY
                  </span>

                  <strong>
                    {property.title}
                  </strong>

                  <div className="havenly-map-card-location">

                    <MapPin size={13} />

                    <span>
                      {property.address ||
                        property.city ||
                        'Location available'}
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  NEARBY PLACES
                  ================================================= */}

              {nearbyPlaces.length > 0 && (

                <div className="havenly-nearby">

                  <span className="havenly-nearby-title">
                    Nearby
                  </span>

                  <div className="havenly-nearby-list">

                    {nearbyPlaces.map((place, index) => (

                      <span
                        className="havenly-nearby-chip"
                        key={`${place}-${index}`}
                      >
                        <span className="havenly-nearby-dot" />

                        {place}
                      </span>

                    ))}

                  </div>

                </div>

              )}

              {/* =================================================
                  MAP CONTROLS
                  ================================================= */}

              <div className="havenly-map-controls">

                <button
                  type="button"
                  aria-label="Zoom in"
                >
                  +
                </button>

                <button
                  type="button"
                  aria-label="Zoom out"
                >
                  −
                </button>

              </div>

              {/* =================================================
                  MAP BOTTOM
                  ================================================= */}

              <div className="havenly-map-bottom">

                <div>

                  <span>
                    {hasCoordinates
                      ? 'PROPERTY AREA'
                      : 'EXACT AREA'}
                  </span>

                  <strong>
                    {property.address ||
                      property.city ||
                      'Location available'}
                  </strong>

                </div>

                <a
                  href={exploreMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="havenly-map-explore"
                >
                  Explore map
                  <ArrowRight size={14} />
                </a>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            CONTACT SECTION
            ===================================================== */}

        <section className="detail-contact">

          <div className="detail-contact-copy">

            <div className="detail-section-heading">
              <span>03</span>
              <p>Contact us anytime</p>
            </div>

            <h2>
              Hassle-free
              <br />
              <em>property support.</em>
            </h2>

            <p>
              Need more information? Reach out to the Havenly
              team and get help with this property, scheduling
              a visit or understanding your options.
            </p>

          </div>

          <div className="contact-options">

            <a
              href="tel:+919945138608"
              className="contact-card"
            >

              <div className="contact-card-top">

                <div className="contact-icon">
                  <Phone size={16} />
                </div>

                <div>
                  <strong>Call</strong>
                  <span>+91 9945138608</span>
                </div>

              </div>

              <span className="contact-card-button">
                Call now
              </span>

            </a>

            <Link
              to="/"
              className="contact-card"
            >

              <div className="contact-card-top">

                <div className="contact-icon">
                  <MessageCircle size={16} />
                </div>

                <div>
                  <strong>Chat with AI</strong>
                  <span>Get instant assistance</span>
                </div>

              </div>

              <span className="contact-card-button">
                Chat now
              </span>

            </Link>

            <a
              href="tel:+919945138608"
              className="contact-card"
            >

              <div className="contact-card-top">

                <div className="contact-icon">
                  <Video size={16} />
                </div>

                <div>
                  <strong>Video Call</strong>
                  <span>+91 9945138608</span>
                </div>

              </div>

              <span className="contact-card-button">
                Video call now
              </span>

            </a>

            <a
              href="sms:+919945138608"
              className="contact-card"
            >

              <div className="contact-card-top">

                <div className="contact-icon">
                  <Mail size={16} />
                </div>

                <div>
                  <strong>Message</strong>
                  <span>Send us a message</span>
                </div>

              </div>

              <span className="contact-card-button">
                Message now
              </span>

            </a>

          </div>

        </section>

      </div>
    </main>
  )
}