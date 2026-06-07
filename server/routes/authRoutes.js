const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const User = require('../models/User')

// LOGIN
router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {

      return res.status(400).json({
        message: 'Invalid email'
      })

    }

    // Plain text password check
    const isMatch = password === user.password

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid password'
      })

    }

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '7d'
      }

    )

    res.json({

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }

    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

module.exports = router