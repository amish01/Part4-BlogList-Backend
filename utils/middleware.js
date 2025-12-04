const usersRouter = require('../controllers/users')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const tokenExtractor = (request, response, next) => {
  let authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    authorization = authorization.replace('Bearer ', '')
    request.token = authorization
  }
  next()
}

const userExtractor = async (request, response, next) => {
  let authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    authorization = authorization.replace('Bearer ', '')
    //request.token = authorization
  }
  let decodedToken = null
  if (request.method !== 'GET') {
    decodedToken = jwt.verify(authorization, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
  }
  //console.log(user)
  next()
}
module.exports = {tokenExtractor, userExtractor}