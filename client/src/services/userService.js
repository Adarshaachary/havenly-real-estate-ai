const favoriteKey = 'havenly-favorites'
const bookingKey = 'havenly-bookings'

// ==============================
// FAVORITES
// ==============================

export function getFavorites() {
  return JSON.parse(localStorage.getItem(favoriteKey) || '[]')
}

export function toggleFavorite(id) {
  const favorites = getFavorites()

  const next = favorites.includes(id)
    ? favorites.filter((item) => item !== id)
    : [...favorites, id]

  localStorage.setItem(favoriteKey, JSON.stringify(next))

  return next
}

// ==============================
// BOOKINGS
// ==============================

export function getBookings() {
  return JSON.parse(localStorage.getItem(bookingKey) || '[]')
}

// Create a new booking
export function bookVisit(property, bookingDate, bookingTime) {
  const bookings = getBookings()

  const newBooking = {
    ...property,

    // Unique ID for this booking
    bookingId: `${property.id}-${Date.now()}`,

    // Selected visit date
    bookingDate,

    // Selected visit time
    bookingTime,

    // When the booking was created
    bookedAt: new Date().toISOString(),

    // Current booking status
    status: 'Confirmed',
  }

  const next = [...bookings, newBooking]

  localStorage.setItem(bookingKey, JSON.stringify(next))

  return next
}

// Delete / cancel a booking
export function deleteBooking(bookingId) {
  const bookings = getBookings()

  const next = bookings.filter(
    (booking) => booking.bookingId !== bookingId
  )

  localStorage.setItem(bookingKey, JSON.stringify(next))

  return next
}