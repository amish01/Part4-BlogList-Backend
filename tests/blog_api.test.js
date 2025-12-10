const { test, beforeEach, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const assert = require('node:assert')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtaW51MTExMTEiLCJpZCI6IjY5MzE4YTEwNWY5YjM0NzQxNzJiMjNlYSIsImlhdCI6MTc2NDg1NzgzOCwiZXhwIjoxNzY0ODYxNDM4fQ._u5O3ZpubQOSdxvgwhBVTde8yZzXBi5LY05tTGXikeU"
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let noteObject = new Blog(helper.initialBlogs[0])
  await noteObject.save()

  noteObject = new Blog(helper.initialBlogs[1])
  await noteObject.save()

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
    "title": "POST blog111",
    "author": "A. blog55111",
    "url": "http://blog55111",
    "likes": 3111,
}

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  const blogTitles = blogsAtEnd.map(b => b.title)
  assert(blogTitles.includes(newBlog.title), true)
})


test('adding a blog fails without a valid token ', async () => {
  const newBlog = {
    "title": "POST blog22",
    "author": "A. blog2211",
    "url": "http://blog55111",
    "likes": 31,
}

  await api
    .post('/api/blogs')
    .set('Authorization', 'wwoeurw')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  const blogTitles = blogsAtEnd.map(b => b.title)
})

test('default value for like property is zero ', async () => {
  const newBlog = {
    "title": "POST with default like property_1",
    "author": "A. blog02",
    "url": "http://blog5",
}

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})


test('missing title or url properties ', async () => {
  const newBlog = {
    "author": "A. blog02",
    "url": "http://blog5",
}

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

  test('deleting a blog succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
  
  
    await api
      .del(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
  
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('information of a blog can be updated ', async () => {

    const blogsAtStart = await helper.blogsInDb()
    let blogToUpdate = blogsAtStart[0]
    blogToUpdate = {...blogToUpdate, likes: blogToUpdate.likes + 2}
   
  
    await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .set('Authorization', token)
          .send(blogToUpdate)
          .expect(200)
          .expect('Content-Type', /application\/json/)

  
    const updatedBlog = (await helper.blogsInDb()).find(b => b.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
  })

  test('user with invalid username or password is not created ', async () => {
    const newUser = {
      "username": "AA",
      "name": "aminu",
      "password": "aa"
  }
  const usersAtStart = await helper.usersInDb()
    await api
      .post('/api/users')
      .set('Authorization', token)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  

after(async () => {
  await mongoose.connection.close()
})