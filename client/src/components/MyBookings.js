import { useEffect, useState, useCallback } from 'react'

function MyBookings({ user }) {

  const [bookings, setBookings] = useState([])

  const fetchBookings = useCallback(async () => {

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/bookings`
    )

    const data = await response.json()

    const userBookings = data.filter(
      (booking) =>
        booking.userName === user.name
    )

    setBookings(userBookings)

  }, [user.name])

  useEffect(() => {

    fetchBookings()

  }, [fetchBookings])

  return (

    <div
      className="
        bg-white
        p-6
        rounded-2xl
        shadow-lg
        mb-8
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >

        My Bookings

      </h2>

      {

        bookings.length === 0

        ? (

          <p>No bookings yet</p>

        )

        : (

          bookings.map((booking) => (

            <div
              key={booking._id}

              className="
                border
                rounded-xl
                p-4
                mb-4
              "
            >

              <p className="font-bold">

                {booking.slot.facility.name}

              </p>

              <p>

                {booking.slot.date}

              </p>

              <p>

                {

                  booking.slot.startTime

                }

                -

                {

                  booking.slot.endTime

                }

              </p>

            </div>

          ))

        )

      }

    </div>
  )
}

export default MyBookings