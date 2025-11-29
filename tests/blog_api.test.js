const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const assert = require('node:assert')


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

test('verify that blog unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  
  assert.strictEqual(Object.keys(response.body[0]).includes('id'), true)
})


test('a valid blog can be added ', async () => {
  const newBlog = {
    "title": "POST blog",
    "author": "A. blog55",
    "url": "http://blog55",
    "likes": 3,
}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  //const helper = require('./test_helper')
  //const Note = require('../models/note')
  //const contents = response.body.map(r => r.content)
  const blogTitles = blogsAtEnd.map(b => b.title)

  //assert.strictEqual(response.body.length, initialNotes.length + 1)

  assert(blogTitles.includes(newBlog.title), true)
})

after(async () => {
  await mongoose.connection.close()
})