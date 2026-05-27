import { useEffect, useState } from 'react'

import AddFacility from './components/AddFacility'
import AddSlot from './components/AddSlot'
import Login from './components/Login'
import MyBookings from './components/MyBookings'

function App() {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  )

  const [facilities, setFacilities] = useState([])
  const [slots, setSlots] = useState([])

  const fetchFacilities = async () => {

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/facilities`
    )

    const data = await response.json()

    setFacilities(data)
  }

  const fetchSlots = async () => {

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/slots`
    )

    const data = await response.json()

    setSlots(data)
  }

  const handleBooking = async (slotId) => {

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/bookings`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          slotId,
          userName: user.name
        })
      }
    )

    const data = await response.json()

    alert(data.message)

    fetchSlots()
  }

  useEffect(() => {

    fetchFacilities()
    fetchSlots()

  }, [])

  if (!user) {

    return <Login setUser={setUser} />
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1
        className="
          text-4xl
          font-bold
          text-center
          mb-8
          text-blue-600
        "
      >

        Sports Booking System

      </h1>

      <AddFacility
        fetchFacilities={fetchFacilities}
      />

      <AddSlot
        facilities={facilities}
        fetchSlots={fetchSlots}
      />

      <MyBookings user={user} />

      <div
        className="
          bg-white
          p-6
          rounded-2xl
          shadow-lg
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-4
          "
        >

          Available Slots

        </h2>

        {

          slots.map((slot) => (

            <div
              key={slot._id}

              className="
                border
                rounded-xl
                p-4
                mb-4
              "
            >

              <p className="font-bold">

                {slot.facility?.name}

              </p>

              <p>{slot.date}</p>

              <p>

                {slot.startTime}
                -
                {slot.endTime}

              </p>

              <button

                onClick={() =>
                  handleBooking(slot._id)
                }

                className="
                  mt-3
                  bg-blue-500
                  hover:bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >

                Book Slot

              </button>

            </div>

          ))

        }

      </div>

    </div>
  )
}

export default App