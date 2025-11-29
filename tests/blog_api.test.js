const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')


const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let noteObject = new Blog(helper.initialBlogs[0])
  await noteObject.save()

  noteObject = new Blog(helper.initialBlogs[1])
  await noteObject.save()

  // noteObject = new Blog(helper.initialBlogs[2])
  // await noteObject.save()

  // noteObject = new Blog(helper.initialBlogs[3])
  // await noteObject.save()

  // noteObject = new Blog(helper.initialBlogs[4])
  // await noteObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})