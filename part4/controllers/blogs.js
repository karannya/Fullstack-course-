const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
/* blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  }) */
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
/* blogsRouter.delete('/:id', async (request, response) => {
  
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
}) */
/*blogsRouter.post('/', (request, response) => {
    const body=request.body;
    //const blog = new Blog(request.body)
    const blog = new Blog({
      title: body.content,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
     blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      
      response.status(400).end() 
      
  })*/
blogsRouter.post('/', async (request, response) => {
  
  const body=request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (request.token === 'null') {
    return response.status(401).send('Unauthorized request')
  }
  if (!request.headers.authorization) {
    return response.status(401).send('Unauthorized request')
  }
  const user = await User.findById(decodedToken.id)
  //const blog = new Blog(request.body)
  //const user = await User.findById(body.userId)
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes || 0
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  if (savedBlog) {
    response.status(201).json(savedBlog)
  } else {
    response.status(404).end()
  }
  //response.status(201).json(savedBlog)
})

blogsRouter.put('/:id',async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body
  
  const blog = {
    likes: body.likes,
  }
  const blogId = await Blog.findById(request.params.id)
  console.log(blogId.id)
  const userId = decodedToken.id
  console.log(userId)
  if (blogId.user.toString() === userId.toString()){
    const updatedBlog =await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    const updatedpopulatedBlog = await updatedBlog
      .populate('user', { username: 1, name: 1 })
    if (updatedpopulatedBlog) {
      response.status(200).json(updatedpopulatedBlog)
    } else {
      response.status(404).end()
    }
  } 
})
blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blogId = await Blog.findById(request.params.id)
  console.log(blogId.id)
  const userId = decodedToken.id
  console.log(userId)
  
  if (blogId.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  
  response.status(400).end()
})
/*  const PORT = 3003
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  }) */

module.exports = blogsRouter