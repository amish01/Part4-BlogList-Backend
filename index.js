// const express = require('express')
// const mongoose = require('mongoose')
const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

//require('dotenv').config()


// const app = express()

// const blogSchema = mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
// })

//const Blog = mongoose.model('Blog', blogSchema)

//const mongoUrl = process.env.MONGODB_URI
// mongoose
// .connect(config.MONGODB_URI, { family: 4 })
// .then(() => {
//   //console.log('connected to mongoDB')
//   logger.info('connected to mongoDB')
// })
// .catch((error) =>{
//   //console.error('error connecting to mongoDB', error.message)
//   logger.error('error connecting to mongoDB', error.message)
// } )


// app.use(express.json())

// app.get('/api/blogs', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog.save().then((result) => {
//     response.status(201).json(result)
//   })
// })

//const PORT = process.env.PORT
app.listen(config.PORT, () => {
  //console.log(`Server running on port ${PORT}`)
  logger.info(`Server running on port ${config.PORT}`)
})