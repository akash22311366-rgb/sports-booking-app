import { useState } from 'react'

function AddFacility({ fetchFacilities }) {

  const [name, setName] = useState('')
  const [sportType, setSportType] = useState('')
  const [location, setLocation] = useState('')
  const [pricePerSlot, setPricePerSlot] = useState('')
  const [slotType, setSlotType] = useState('')

  const handleAddFacility = async () => {

    const response = await fetch(
      'http://localhost:5000/api/facilities',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name,
          sportType,
          location,
          pricePerSlot,
          slotType
        })
      }
    )

    const data = await response.json()

    alert('Facility Added')

    fetchFacilities()
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

        Add Facility

      </h2>

      <div className="grid gap-4">

        <input
          type="text"
          placeholder="Facility Name"

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

          className="
            border
            p-3
            rounded-lg
          "
        />

        <input
          type="text"
          placeholder="Sport Type"

          value={sportType}

          onChange={(e) =>
            setSportType(e.target.value)
          }

          className="
            border
            p-3
            rounded-lg
          "
        />

        <input
          type="text"
          placeholder="Location"

          value={location}

          onChange={(e) =>
            setLocation(e.target.value)
          }

          className="
            border
            p-3
            rounded-lg
          "
        />

        <input
          type="number"
          placeholder="Price Per Slot"

          value={pricePerSlot}

          onChange={(e) =>
            setPricePerSlot(e.target.value)
          }

          className="
            border
            p-3
            rounded-lg
          "
        />

        <select

          value={slotType}

          onChange={(e) =>
            setSlotType(e.target.value)
          }

          className="
            border
            p-3
            rounded-lg
          "
        >

          <option value="">
            Select Slot Type
          </option>

          <option value="exclusive">
            Turf / Badminton
          </option>

          <option value="capacity">
            Swimming Pool
          </option>

          <option value="resource">
            Snooker
          </option>

        </select>

        <button

          onClick={handleAddFacility}

          className="
            bg-green-500
            hover:bg-green-600
            text-white
            py-3
            rounded-lg
          "
        >

          Add Facility

        </button>

      </div>

    </div>
  )
}

export default AddFacility