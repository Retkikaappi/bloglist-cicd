const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, resp) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passCorrect = user === null ? false : await bcrypt.compare(password, user.passHash)

  if(!(user && passCorrect)){
    return resp.status(401).json({ error:'invalid login credentials' })
  }

  const activeUser = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(activeUser, process.env.SECRET)

  resp.status(200).send({ token, username: user.username, name: user.username })
})

module.exports = loginRouter