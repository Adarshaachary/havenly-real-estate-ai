import { CalendarDays, MapPin, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { deleteBooking, getBookings } from '../services/userService'
import { Link } from 'react-router-dom'

export default function Bookings() {
  const [bookings, setBookings] = useState(getBookings())

  const handleRemoveVisit = (bookingId) => {
    const updatedBookings = deleteBooking(bookingId)
    setBookings(updatedBookings)
  }

  return (
    <section className="page-wrap collection-page">
      <p className="eyebrow">Your calendar</p>

      <h1>
        Time to see<br />
        <em>how it feels.</em>
      </h1>

      {bookings.length ? (
        <div className="booking-list">
          {bookings.map((item, index) => (
            <article
              className="booking-item"
              key={`${item.bookingId || item.id}-${index}`}
            >
              <img src={item.image} alt="" />

              <div>
                <p className="eyebrow">
                  <MapPin size={13} /> {item.city}
                </p>

                <h2>{item.title}</h2>

                <p>
                  <CalendarDays size={15} /> Visit request received
                </p>

                {item.bookingDate && (
                  <p>
                    <CalendarDays size={15} /> {item.bookingDate}
                    {item.bookingTime && ` at ${item.bookingTime}`}
                  </p>
                )}
              </div>

              <div className="booking-actions">
                <span>Confirmed</span>

                <button
                  className="remove-visit-btn"
                  onClick={() => handleRemoveVisit(item.bookingId)}
                  type="button"
                >
                  <Trash2 size={15} />
                  Remove Visit
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No visits on the calendar.</h2>

          <p>
            When a home feels right, book a private visit from its detail page.
          </p>

          <Link className="primary-button" to="/properties">
            Explore homes
          </Link>
        </div>
      )}
    </section>
  )
}