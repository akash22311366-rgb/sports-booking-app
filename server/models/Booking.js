const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },

  userName: {
    type: String,
    required: true
  },

  players: {
    type: Number,
    default: 1
  },

  bookedResources: {
    type: Number,
    default: 1
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Booking', BookingSchema)