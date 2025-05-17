const User = require("../models/user.model")
const Message = require('../models/message.model')

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })

    res.status(200).json(filteredUsers)
  } catch (error) {
    console.log('Error in getUsersForSidebar controller:', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params
    const senderId = req.user._id

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    })

    res.status(200).json(messages)
  } catch (error) {
    console.log('Error in getMessages controller:', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    let imageUrl
    if (image) {
      const uploadResponse = await cloudinary_js_config.uploader.upload(image)
      imageUrl = uploadResponse.secure_url
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    })

    await newMessage.save()
    res.status(201).json(newMessage)
  } catch (error) {
    console.log('Error in sendMessage controller:', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getUsersForSidebar,
  getMessages,
  sendMessage
}