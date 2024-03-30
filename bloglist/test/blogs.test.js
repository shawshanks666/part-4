const {test,after}= require('node:test')
const mongoose = require('mongoose')
const supertest= require('supertest')
const app= require('../app')
const assert = require('node:assert')
const Blog= require('../models/blog')
const { request } = require('node:http')
const { response } = require('../app')
const api = supertest(app)


// test('blogs are returned as json', async () => {
//   const response = await api
//     .get('/api/blogs')
//     // .expect(200)
//     // .expect('Content-Type', /application\/json/)
//     assert.strictEqual(response.body.length,17)

// })




// Example usage
test('Verify _id values are unique in collection', async () => {
  const cursor = await Blog.find({}, { id: 1 });
  const string= await JSON.stringify(cursor)
  const array= JSON.parse(string)
  const set = new Set(array.map(blog=> blog.id))
  assert.strictEqual(set.size, array.length)
  
});

test('Verify post works', async () =>{
  const blogsBefore= await api.get('/api/blogs')
  const blogPost= {
    
      "title":"wolfwalkers",
      "author":"idk",
      "url":"abc",
      "likes":"32"
  
  }
  await api
  .post('/api/blogs')
  .send(blogPost)
  .expect(201)

  const blogsAfter = await api
  .get('/api/blogs')

  assert.strictEqual(blogsBefore.body.length+1,blogsAfter.body.length)
})


test('delete a blog', async() =>{
  await api.delete('/api/blogs/65fc7db9e11de035c2d07dc3')
})

test('update likes of a post', async() => {

  const likes = {"likes": 22}
  await api.put('/api/blogs/65fc7bdf541ce12b39e73502')
  .send(likes)
})

after(async () => {
  await mongoose.connection.close()
})