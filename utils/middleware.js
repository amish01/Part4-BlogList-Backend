const tokenExtractor = (request, response, next) => {
  let authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    authorization = authorization.replace('Bearer ', '')
    request.token = authorization
  }

  next()
}


module.exports = {tokenExtractor}