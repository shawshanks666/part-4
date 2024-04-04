const blogsRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


blogsRouter.get('/', (request, response) => {

    Blog
      .find({})
      .populate('user', { username: 1, name: 1, id:1 })
      .then(blogs => {
        logger.info("logger is working")
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)


  const body= await request.body
  // const userData= {
  //   username: user.username,
  //   name:user.name,
  //   id:user.id,
  // }

  const blog = new Blog({
    url: body.url,
    title:body.title,
    author:body.author,
    likes:body.likes,
    user:user.id
  })
  
  const savedNote = await blog.save()

  user.notes = user.notes.concat(savedNote._id)
  await user.save()  
  response.json(savedNote) 
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog
  .findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1, id:1 })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})
  module.exports = blogsRouter;