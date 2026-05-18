const mongoose = require('mongoose')

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  sportType: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  pricePerSlot: {
    type: Number,
    required: true
  },

  slotType: {
    type: String,
    enum: ['exclusive', 'capacity', 'resource'],
    required: true
  },

  capacity: {
    type: Number,
    default: 1
  },

  totalResources: {
    type: Number,
    default: 1
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Facility', FacilitySchema)