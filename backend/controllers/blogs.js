const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', userExtractor, async (req, resp) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  resp.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, resp) => {
  const body = req.body

  if (!req.token) {
    return resp.status(401).json({ error: 'no token' })
  }
  if (!req.token.id) {
    return resp.status(401).json({ error: 'invalid token' })
  }
  if (!body.title || !body.author) {
    return resp.status(401).json({ error: 'missing title or author' })
  }

  const user = await User.findById(req.token.id)
  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  resp.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, resp) => {
  const blog = await Blog.findById(req.params.id)
  if (!(blog.user._id.toString() === req.token.id)) {
    resp.status(401).json({ error: 'invalid user token required for deletion' })
  }
  await Blog.deleteOne(blog)
  resp.status(204).end()
})

blogsRouter.put('/:id', async (req, resp) => {
  const blog = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })
  resp.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (req, resp) => {
  const blog = await Blog.findById(req.params.id)
  blog.comments = blog.comments.concat(req.body)
  const savedblog = await blog.save()
  resp.status(201).json(savedblog)
})

module.exports = blogsRouter
