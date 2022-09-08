const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  if (!request.body.password || request.body.password === '') {
    return response.status(400).json({ 
      error: 'Password cannot be empty'
    })
  }
  if (!request.body.username || request.body.username === '') {
    return response.status(400).json({ 
      error: 'Username cannot be empty'
    })
  }
  if (!request.body.password || request.body.password <= 3) {
    return response.status(400).json({ 
      error: 'Password cannot be less than 3 charchater' 
    })
  } 
  if (!request.body.username || request.body.username <= 3) {
    return response.status(400).json({ 
      error: 'Username cannot be less than 3 charchater' 
    })
  } 
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    name,
    passwordHash,
  })
  
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})
  
module.exports = usersRouter