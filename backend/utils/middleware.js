const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLog = (req,resp,next) => {
  logger.info(`Method: ${req.method} - Path: ${req.path} - Body: `, req.body)
  next()
}

const tokenExtractor = (req, resp, next) => {
  let auth = req.get('authorization')
  if(auth && auth.startsWith('Bearer ')){
    auth = auth.replace('Bearer ', '')
    const token = jwt.verify(auth, process.env.SECRET)
    req.token = token
  }
  next()
}

const userExtractor = async (req, reps, next) => {
  if(req.token){
    const user = await User.findById(req.token.id)
    req.user = user
  }
  next()
}

const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ err: 'unknown endpoint' })
}

const errHandle = (err, req, resp, next) => {
  if(err.name === 'CastError') {
    return resp.status(400).send({ error: 'malformatted id' })
  }
  else if(err.name === 'ValidationError') {
    return resp.status(400).json({ error: err.message })
  }
  else if(err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    return resp.status(400).json({ error: 'username needs to be unique' })
  }
  else if(err.name ===  'JsonWebTokenError') {
    console.log(err.name)
    return resp.status(400).json({ error: 'token missing or invalid' })
  }

  next(err)
}

module.exports = {
  requestLog,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errHandle
}