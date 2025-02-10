const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

usersRouter.post('/', userExtractor, async (req, resp) => {
  const { username, name, password } = req.body
  if(!password || password.length < 3){
    return resp.status(401).json({ error: 'there needs to be a password that is longer than 3 characters' })
  }
  const saltRounds = 10
  const passHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passHash,
  })

  const newUser = await user.save()
  resp.status(201).json(newUser)
})

usersRouter.get('/', async (req, resp) => {
  const users = await User.find({}).populate('blogs', { url:1, title:1, author:1 })
  resp.json(users)
})

module.exports = usersRouter