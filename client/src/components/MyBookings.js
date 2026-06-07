import {
  useEffect,
  useState,
  useCallback
} from 'react'

function MyBookings() {

  const [bookings, setBookings] = useState([])

  const fetchBookings = useCallback(async () => {

    try {

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/bookings`
      )

      const data = await response.json()

      setBookings(data)

    } catch (error) {

      console.log(error)

    }

  }, [])

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
                {booking.slot?.facility?.name}
              </p>

              <p>
                {booking.slot?.date}
              </p>

              <p>
                {booking.slot?.startTime}
                -
                {booking.slot?.endTime}
              </p>

              <p>
                User: {booking.userName}
              </p>

            </div>

          ))

        )

      }

    </div>
  )
}

export default MyBookings