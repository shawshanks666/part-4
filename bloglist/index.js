const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const Blog = require('./models/blog')
const password = process.argv[2]
const mongoUrl = `mongodb+srv://shashanksinghzero:${password}@cluster0.zxqbevh.mongodb.net/Bloglist?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)
// app.get('/api/blogs', (request, response) => {

//   Blog
//     .find({})
//     .then(blogs => {
//       logger.info("logger is working")
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})