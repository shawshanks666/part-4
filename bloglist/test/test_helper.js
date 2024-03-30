const Blog = require('../models/blog')

const User = require('../models/user')

const initialBlogs = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb =async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}