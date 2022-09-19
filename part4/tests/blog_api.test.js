const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}) 

describe('Blogs which are present', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 500000)
  
  test('are all returned when using the /api/blogs route', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('verifies that the unique identifier property of the blog posts "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})
/* describe('Blogs with update', () => {
  let token=null
  beforeEach(async () => {
    
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('pass123', 10)
    const user = new User({ username: 'Emily', passwordHash })

    await user.save()
    const newUser = {
      username: 'Emily',
      //name: 'Harshad',
      password: 'pass123',
    }
    
    const res = await api
      .post('/api/login')
      .send(newUser)
    
    token = res.body.token
    return token
        
  })
  test('update the likes of the blog', async () => {
    const newBlog = {
      title: 'Blog with added likes',
      author: 'Annya Kar',
      url: 'http://www.blogapi.com',
      likes:100
    }
  
    const response = await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtStart = await helper.blogsInDb()
    const updatedBlog = blogsAtStart[6]
    
    const updateLike=await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .set({ Authorization: `bearer ${token}` })
      .send({likes: 8})
      .expect(200)
    //.expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    console.log('blogsAtEnd',blogsAtEnd)
  
  
    // console.log('updatedBlog',blogsAtEnd)
    //expect(response).toHaveLength(helper.initialBlogs.length)

    expect(updateLike.body.likes).toBe(8)
  })
}) */
describe('addition of a new blog', () => {
  let token=null
  beforeEach(async () => {
    
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('pass123', 10)
    const user = new User({ username: 'Emily', passwordHash })

    await user.save()
    const newUser = {
      username: 'Emily',
      //name: 'Harshad',
      password: 'pass123',
    }
    
    const res = await api
      .post('/api/login')
      .send(newUser)
    
    token = res.body.token
    return token
        
  })
   
  //await user.save()
  test('succeeds with valid blog', async () => {
    const newBlog = {
      title: 'My blog title',
      author: 'Annya Kar',
      url: 'http://www.blogapi.com',
      likes: 8,
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'My blog title'
    )
  })

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      author: 'Annya Kar',
      url: 'http://www.blogapi.com',
      likes: 10,
        
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test('Default value assigned 0 if likes property is missing from request', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Annya Kar',
      url: 'http://www.blogapi.com',
    }
    
    const response = await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(response.body.likes).toBe(0)
  })

  
  test('fails with status code 400 if title is missing', async () => {
    const newBlog = {
      title: 'My blog title',
      author: 'Annya Kar',
      likes: 10,
          
    }
  
    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test('fails with status code 400 if url is missing', async () => {
    const newBlog = {
      likes: 10,
          
    }
  
    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
    
  test('Authorizedperson able to update the likes of a blog', async () => {
    await Blog.deleteMany({})
    const newBlog = {
      title: 'Blog with added likes',
      author: 'Annya Kar',
      url: 'http://www.blogapi.com',
      likes:100
    }
  
    const response = await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtStart = await helper.blogsInDb()
    const updatedBlog = blogsAtStart[0]
    
    const updateLike=await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .set({ Authorization: `bearer ${token}` })
      .send({likes: 8})
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    console.log('blogsAtEnd',blogsAtEnd)
    
    expect(blogsAtEnd).toHaveLength(1)
    expect(updateLike.body.likes).toBe(8)
  })

  test('Authorizedperson able to delete a blog', async () => {
    await Blog.deleteMany({})
    const newBlog = {
      title: 'Blog with added likes',
      author: 'Annya Kar',
      url: 'http://www.blogapi.com',
      likes:50
    }
  
    const response = await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtStart = await helper.blogsInDb()
    const deleteBlog = blogsAtStart[0]
    
    await api
      .delete(`/api/blogs/${deleteBlog.id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204)
      
    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtStart).toHaveLength(1)
    expect(blogsAtEnd).toHaveLength(0)
  })
  
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body.error).toContain('username must be unique')
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
  
afterAll(() => {
  mongoose.connection.close()
})
