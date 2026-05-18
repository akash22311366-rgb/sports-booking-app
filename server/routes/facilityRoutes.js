const express = require('express')
const router = express.Router()

const Facility = require('../models/Facility')


// CREATE FACILITY
router.post('/', async (req, res) => {
  try {
    const facility = await Facility.create(req.body)

    res.status(201).json(facility)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})


// GET ALL FACILITIES
router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find()

    res.json(facilities)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

module.exports = router