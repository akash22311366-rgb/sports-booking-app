const mongoose = require('mongoose')

const SlotSchema = new mongoose.Schema({
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true
  },

  date: {
    type: String,
    required: true
  },

  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  },

  totalCapacity: {
    type: Number,
    default: 1
  },

  bookedCount: {
    type: Number,
    default: 0
  },

  totalResources: {
    type: Number,
    default: 1
  },

  bookedResources: {
    type: Number,
    default: 0
  },

  isBooked: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Slot', SlotSchema)