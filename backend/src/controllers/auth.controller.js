const generateToken = require('../lib/utils')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const cloudinary = require('../lib/cloudinary')

const signup = async (req, res) => {
  const { fullName, email, password } = req.body
  try {

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be atleast 6 characters" })
    }

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      fullName,
      email,
      password: passwordHash
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic
      })

    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.log('Error in signup controller', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    })
  } catch (error) {
    console.log('Error in login controller', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const logout = (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0
    })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log('Error in logout controller', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const updateProfile = async (req, res) => {
  const { profilePic } = req.body

  const userId = req.user._id

  try {
    if (!profilePic) {
      return res.status(400).json({ message: 'Profile Pic is required' })
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log('Error in updateProfile controller', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log('Error in checkAuth controller', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth
}