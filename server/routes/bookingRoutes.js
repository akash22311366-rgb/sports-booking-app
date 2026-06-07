// CREATE BOOKING
router.post('/', async (req, res) => {

  try {

    console.log("Booking Request:", req.body)

    const {
      slotId,
      userName,
      players,
      bookedResources
    } = req.body

    const slot = await Slot.findById(slotId)
      .populate('facility')

    if (!slot) {
      return res.status(404).json({
        message: 'Slot not found'
      })
    }

    const facility = slot.facility

    // EXCLUSIVE
    if (facility.slotType === 'exclusive') {

      if (slot.isBooked) {
        return res.status(400).json({
          message: 'Slot already booked'
        })
      }

      slot.isBooked = true
    }

    // CAPACITY
    if (facility.slotType === 'capacity') {

      if (
        slot.bookedCount + players >
        slot.totalCapacity
      ) {
        return res.status(400).json({
          message: 'No vacancies left'
        })
      }

      slot.bookedCount += players
    }

    // RESOURCE
    if (facility.slotType === 'resource') {

      if (
        slot.bookedResources + bookedResources >
        slot.totalResources
      ) {
        return res.status(400).json({
          message: 'Resources unavailable'
        })
      }

      slot.bookedResources += bookedResources
    }

    await slot.save()

    const booking = await Booking.create({
      slot: slotId,
      userName,
      players,
      bookedResources
    })

    console.log("Booking Saved:", booking)

    res.status(201).json(booking)

  } catch (error) {

    console.log("BOOKING ERROR:", error)

    res.status(500).json({
      message: error.message
    })

  }

})