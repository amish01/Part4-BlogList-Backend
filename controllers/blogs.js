const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user') //{ username: 1, name: 1 }
    response.json(blogs)
  
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if((body.title === undefined || body.url === undefined))
    return response.status(400).json({error: 'blog title or url missing'}).end()
  let blog_user = null
  const blogUsers = await User.find({})
  if (blogUsers.length > 0) {
    blog_user = blogUsers[Math.floor((Math.random()*(blogUsers.length) + 1))]
  }
  

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: blog_user.id
  })

  const savedBlog = await blog.save()
  blog_user.blogs = blog_user.blogs.concat(savedBlog.id)
  await blog_user.save()
  response.status(201).json(savedBlog)

})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  
  const updatedBlog = await blog.save()
  return response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter