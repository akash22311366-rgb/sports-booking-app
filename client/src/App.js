import { useEffect, useState } from 'react'

import Login from './components/Login'
import AddFacility from './components/AddFacility'
import AddSlot from './components/AddSlot'
import MyBookings from './components/MyBookings'

function App() {

  const [facilities, setFacilities] = useState([])
  const [slots, setSlots] = useState([])

  const [user, setUser] = useState(

    JSON.parse(
      localStorage.getItem('user')
    )

  )

  const fetchFacilities = async () => {

    const response = await fetch(
      '`${process.env.REACT_APP_API_URL}/api/facilities`'
    )

    const data = await response.json()

    setFacilities(data)
  }

  const fetchSlots = async () => {

    const response = await fetch(
      '`${process.env.REACT_APP_API_URL}/api/facilities`'
    )

    const data = await response.json()

    setSlots(data)
  }

  useEffect(() => {

    fetchFacilities()
    fetchSlots()

  }, [])

  const handleBooking = async (slotId) => {

    const response = await fetch(
      '`${process.env.REACT_APP_API_URL}/api/facilities`/api/bookings',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          slotId,
          userName: user.name,
          players: 1,
          bookedResources: 1
        })
      }
    )

    const data = await response.json()

    alert(data.message || 'Booking Successful')

    fetchSlots()
  }

  const handleLogout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setUser(null)
  }

  if (!user) {

    return <Login setUser={setUser} />

  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-blue-600
          "
        >

          Sports Booking App

        </h1>

        <div>

          <span className="mr-4 font-semibold">

            Welcome, {user.name}

          </span>

          <button

            onClick={handleLogout}

            className="
              bg-red-500
              hover:bg-red-600
              text-white
              px-4
              py-2
              rounded-lg
            "
          >

            Logout

          </button>

        </div>

      </div>

      {

        user.role === 'owner' && (

          <>

            <AddFacility
              fetchFacilities={fetchFacilities}
            />

            <AddSlot
              facilities={facilities}
              fetchSlots={fetchSlots}
            />

          </>

        )

      }

      <MyBookings user={user} />

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {

          facilities.map((facility) => (

            <div
              key={facility._id}

              className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
              "
            >

              <h2 className="text-2xl font-bold mb-2">

                {facility.name}

              </h2>

              <p className="text-gray-600 mb-1">

                Sport: {facility.sportType}

              </p>

              <p className="text-gray-600 mb-1">

                Location: {facility.location}

              </p>

              <p className="text-green-600 font-bold mb-4">

                ₹{facility.pricePerSlot}

              </p>

              <h3 className="font-bold text-lg mb-3">

                Available Slots

              </h3>

              {

                slots
                .filter(
                  (slot) =>
                    slot.facility._id === facility._id
                )
                .map((slot) => (

                  <div
                    key={slot._id}

                    className="
                      border
                      rounded-xl
                      p-4
                      mb-4
                      bg-gray-50
                    "
                  >

                    <p className="font-semibold">

                      {slot.startTime} - {slot.endTime}

                    </p>

                    {

                      facility.slotType === 'exclusive' && (

                        <p className="mt-2">

                          {

                            slot.isBooked

                            ? (
                              <span className="text-red-500 font-bold">

                                Booked

                              </span>
                            )

                            : (
                              <span className="text-green-500 font-bold">

                                Available

                              </span>
                            )

                          }

                        </p>

                      )

                    }

                    {

                      facility.slotType === 'capacity' && (

                        <p className="mt-2 text-blue-600 font-semibold">

                          Remaining Spots:

                          {

                            slot.totalCapacity
                            - slot.bookedCount

                          }

                          / {slot.totalCapacity}

                        </p>

                      )

                    }

                    {

                      facility.slotType === 'resource' && (

                        <p className="mt-2 text-purple-600 font-semibold">

                          Remaining Tables:

                          {

                            slot.totalResources
                            - slot.bookedResources

                          }

                          / {slot.totalResources}

                        </p>

                      )

                    }

                    <button

                      onClick={() =>
                        handleBooking(slot._id)
                      }

                      className="
                        mt-4
                        w-full
                        bg-blue-500
                        hover:bg-blue-600
                        text-white
                        py-2
                        rounded-lg
                        transition
                      "
                    >

                      Book Now

                    </button>

                  </div>

                ))

              }

            </div>

          ))

        }

      </div>

    </div>
  )
}

export default App