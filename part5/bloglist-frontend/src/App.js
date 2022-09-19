import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')
  /* const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') */
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage({
        text: 'Wrong username or password',
        type:'error'

      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }
  const addBlog=(blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log(setErrorMessage)
        setErrorMessage({
          text: `Blog ${returnedBlog.title} by ${returnedBlog.author}`,
          type:'success'

        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      .catch (error => {
        console.log(error)
        setErrorMessage({
          text: 'Blog is not added',
          type:'error'
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }
  const updateBlog = async (id) => {

    const present=blogs.find(item => item.id===id)
    const updatedblog = { ...present, likes:present.likes +1 }
    console.log(updatedblog)
    blogService
      .update(updatedblog.id,updatedblog)
      .then((updatedBlog) => {
        console.log(updatedBlog)
        //setBlogs(updatedblog)
        setBlogs(blogs.map(p => p.id !== present.id ? p : updatedblog))

      })
  }
  const showBlog=blogs.sort((a, b) => (b.likes) - (a.likes))
  const deleteInfo=(id) => {

    const present=blogs.find(item => item.id===id)
    console.log('id',typeof(present.id))
    const message = `Remove blog ${ present.title } by ${present.author }?`
    if(window.confirm(message) === true){
      blogService
        .remove(id)
        .then(response => {
          console.log(response)
          setBlogs(blogs.filter(item => item.id !== present.id))
        }).catch (error => {
          console.log(error)
          setErrorMessage({
            text: 'You are not authorized to delete',
            type:'error'
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  /* const updateLikes=(id,blogObject)=>{
    //console.log('blogObject',blogObject.id)
    //const id=blogObject.title
    //const bgid=blogs.map(id=>id===blogs.id)
    blogService
    //.update(blogs.id,updatedLikes)
    .update(id,blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.map((blog) => (blog.id !== blogObject.id ? blog : returnedBlog)))
    })
  } */

  /*  const addBlog=(event)=>{
    //const blog = blogs.find(n => n.title === title)
    event.preventDefault()
    const blogObject={
        title: title,
        author: author,
        url: url
      }

    console.log(blogObject)
    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setTitle('')
        setAuthor('')
        setUrl('')
        //setNewBlog('')
        setErrorMessage({
          text: `Blog '${blogObject.title}' by ${blogObject.author}`,
          type:'success'

        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch (error => {
        setErrorMessage({
          text: 'Blog is not added',
          type:'error'
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  } */
  /* const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" >login</button>
    </form>
  ) */
  /* const blogForm=()=>(
    <form onSubmit={addBlog}>
                <h2>Create new</h2>
                <div>
                    title
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                author
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                url
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit" >create</button>
            </form>
  ) */
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {/* {loginForm()} */}
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Blogs</h2>
      <p>{user.username} logged in
        <button type="button" onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
          showBlog={showBlog}
        />
      </Togglable >
      {/* {blogForm()} */}
      {/* <p>{blogShow()}</p> */}
      {/* <Blogform createBlog={createBlog()}/> */}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={() => deleteInfo(blog.id) } updateBlog={() => updateBlog(blog.id)}
        />
      ) }

    </div>
  )
}

export default App
