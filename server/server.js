const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const facilityRoutes = require('./routes/facilityRoutes')
const slotRoutes = require('./routes/slotRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

app.use(express.json())

app.use('/api/facilities', facilityRoutes)
app.use('/api/slots', slotRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Sports Booking API Running')
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected')
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:')
    console.error(err)
  })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})