import { useState } from 'react'

function AddSlot({
  facilities,
  fetchSlots
}) {

  const [facility, setFacility] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleAddSlot = async () => {

    const selectedFacility =
      facilities.find(
        (f) => f._id === facility
      )

    let slotData = {
      facility,
      date,
      startTime,
      endTime
    }

    if (
      selectedFacility.slotType === 'capacity'
    ) {

      slotData.totalCapacity =
        selectedFacility.capacity

    }

    if (
      selectedFacility.slotType === 'resource'
    ) {

      slotData.totalResources =
        selectedFacility.totalResources

    }

    const response = await fetch(
      'http://localhost:5000/api/slots',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(slotData)
      }
    )

    await response.json()

    alert('Slot Added')

    fetchSlots()
  }

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

        Add Slot

      </h2>

      <div className="grid gap-4">

        <select

          value={facility}

          onChange={(e) =>
            setFacility(e.target.value)
          }

          className="
            border
            p-3
            rounded-lg
          "
        >

          <option value="">
            Select Facility
          </option>

          {

            facilities.map((facility) => (

              <option
                key={facility._id}
                value={facility._id}
              >

                {facility.name}

              </option>

            ))

          }

        </select>

        <input
          type="date"

          value={date}

          onChange={(e) =>
            setDate(e.target.value)
          }

          className="
            border
            p-3
            rounded-lg
          "
        />

        <input
          type="text"
          placeholder="Start Time"

          value={startTime}

          onChange={(e) =>
            setStartTime(e.target.value)
          }

          className="
            border
            p-3
            rounded-lg
          "
        />

        <input
          type="text"
          placeholder="End Time"

          value={endTime}

          onChange={(e) =>
            setEndTime(e.target.value)
          }

          className="
            border
            p-3
            rounded-lg
          "
        />

        <button

          onClick={handleAddSlot}

          className="
            bg-purple-500
            hover:bg-purple-600
            text-white
            py-3
            rounded-lg
          "
        >

          Add Slot

        </button>

      </div>

    </div>
  )
}

export default AddSlot