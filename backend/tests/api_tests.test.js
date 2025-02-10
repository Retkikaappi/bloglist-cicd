const { test, describe, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helpers')
const Blog = require('../models/blog')
const User = require('../models/user')

let loginToken = ''
before(async () => {
  await User.deleteMany({})
  await api.post('/api/users')
    .send(helper.testUser)
  const resp = await api.post('/api/login')
    .send({ username: helper.testUser.username, password: helper.testUser.password })
  loginToken = resp.body.token
})

describe('GET api tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.mockBlogs)
  })

  test('get returns mockBlogs in correct form', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 6 blogs', async () => {
    const blogs = await helper.blogBody()
    assert.strictEqual(blogs.length, helper.mockBlogs.length)
  })

  test('returned blogs have a field for id', async () => {
    const blog = await helper.blogBody()
    assert(blog[0].id)
  })
})

describe('POST api tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.mockBlogs)
  })

  test('blog can be added with a POST-request', async () => {
    const blog = {
      'title': 'Testi Title',
      'author': 'Testi Author',
      'url': 'www.testi.com',
      'likes': 123
    }
    await api.post('/api/blogs')
      .send(blog)
      .set({ 'Authorization': `Bearer ${loginToken}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const isBlogAdded = await helper.blogBody()
    assert.strictEqual(isBlogAdded.length, helper.mockBlogs.length + 1)
  })

  test('added blog has the correct fields' , async () => {
    const blog = {
      'title': 'Testi Title',
      'author': 'Testi Author',
      'url': 'www.testi.com',
      'likes': 123
    }

    await api.post('/api/blogs')
      .send(blog)
      .set({ 'Authorization': `Bearer ${loginToken}` })
      .expect(201)

    const blogs = await helper.blogBody()
    const addedBlog = blogs[helper.mockBlogs.length]
    assert(addedBlog.title && addedBlog.author && addedBlog.url && addedBlog.likes && addedBlog.id)
  })

  test('if you add a blog without any likes, it defaults to zero', async () => {
    const blog = {
      'title': 'Testi Title',
      'author': 'Testi Author',
      'url': 'www.testi.com'
    }

    await api.post('/api/blogs')
      .send(blog)
      .set({ 'Authorization': `Bearer ${loginToken}` })
      .expect(201)

    const blogs = await helper.blogBody()
    const addedBlog = blogs[helper.mockBlogs.length]
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('cannot post a blog without title or/and url', async () => {
    const blog = {
      'author': 'Testi Author',
      'likes': 123
    }

    await api.post('/api/blogs')
      .send(blog)
      .set({ 'Authorization': `Bearer ${loginToken}` })
      .expect(401)
    const blogs = await helper.blogBody()

    assert.strictEqual(blogs.length, helper.mockBlogs.length)
  })
})

describe('PUT api tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const testblog = {
      'title': 'Testi Title',
      'author': 'Testi Author',
      'url': 'www.testi.com',
      'likes': 123
    }
    await api.post('/api/blogs')
      .send(testblog)
      .set({ 'Authorization': `Bearer ${loginToken}` })
  })

  test('likes of a blog can be edited', async () => {
    const updatedBlog = {
      title: 'Title Testi',
      author: 'Author Testi',
      url: 'www.updated.com',
      likes: 321
    }
    const blogs = await helper.blogBody()
    await api.put(`/api/blogs/${blogs[0].id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAfter = await helper.blogBody()
    assert.strictEqual(blogsAfter[0].likes, updatedBlog.likes)
  })
})

describe('DELETE api tests', async () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const testblog = {
      'title': 'Testi Title',
      'author': 'Testi Author',
      'url': 'www.testi.com',
      'likes': 123
    }
    await api.post('/api/blogs')
      .send(testblog)
      .set({ 'Authorization': `Bearer ${loginToken}` })
  })

  test('existing blog can be deleted', async () => {
    const blogs = await helper.blogBody()
    const idToDelete = blogs[0].id

    await api.delete(`/api/blogs/${idToDelete}`)
      .set({ 'Authorization': `Bearer ${loginToken}` })
      .expect(204)

    const blogsAfter = await helper.blogBody()
    assert.strictEqual(blogsAfter.length, blogs.length - 1)
  })

  test('blog can be added and deleted', async () => {
    const blogToDelete = await api.post('/api/blogs')
      .send({ title:'title', author: 'author' })
      .set({ 'Authorization': `Bearer ${loginToken}` })

    const blogsBefore = await helper.blogBody()

    await api.delete(`/api/blogs/${blogToDelete.body.id}`)
      .set({ 'Authorization': `Bearer ${loginToken}` })
      .expect(204)

    const blogsAfter = await helper.blogBody()

    assert.strictEqual(blogsAfter.length, blogsBefore.length - 1)
  })

})

describe('POST user api tests', async () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('user can be added, response has correct username', async () => {
    const user = {
      username: 'testuser',
      name: 'Testa Testi',
      password: 'testpass'
    }
    const resp = await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(resp.body.username, 'testuser')
    const usersAfter = await helper.userBody()
    assert.strictEqual(usersAfter.length, 1)
  })

  test('user cannot be added if password is too short', async () => {
    const user = {
      username: 'testuser',
      name: 'Pass too short Testi',
      password: 'te'
    }
    await api.post('/api/users')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'there needs to be a password that is longer than 3 characters' })
  })

  test('duplicate usernames cannot be added', async () => {
    const user = {
      username: 'dupetestuser',
      name: 'Testa Testi',
      password: 'testpass'
    }
    await api.post('/api/users')
      .send(user)
      .expect(201)

    await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect({ error: 'username needs to be unique' })

    const usersAfter = await helper.userBody()

    assert.strictEqual(usersAfter.length, 1)
  })

})

after(async () => {
  await mongoose.connection.close()
})