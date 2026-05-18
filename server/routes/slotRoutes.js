const express = require('express')
const router = express.Router()

const Slot = require('../models/Slot')


// CREATE SLOT
router.post('/', async (req, res) => {
  try {
    const slot = await Slot.create(req.body)

    res.status(201).json(slot)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})


// GET ALL SLOTS
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find()
      .populate('facility')

    res.json(slots)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

module.exports = router