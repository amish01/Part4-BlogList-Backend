const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if(!username || (password.length < 3)){
    return response.status(400).json({error: "Invalid username or password"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)


  //blog_user.blogs = blog_user.blogs.concat(blog_user.id)


  const user = new User({
    username,
    name,
    passwordHash,
  })
  //user.blogs = blog_user.blogs.concat(blog_user._id)
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  //.populate('notes', {content: 1, important: 1})
  response.json(users)
})

module.exports = usersRouter