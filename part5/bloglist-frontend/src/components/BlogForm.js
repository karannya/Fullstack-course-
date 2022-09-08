import { useState } from 'react'

const BlogForm=({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <form id='addblog-button' onSubmit={addBlog}>
        <h2>Create new</h2>
        <div>
                    title
          <input
            id='title'
            type="text"
            value={title}
            name="title"
            placeholder='Add an content'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                author
          <input
            id='author'
            type="text"
            value={author}
            name="author"
            placeholder='Add an author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                url
          <input
            id='url'
            type="text"
            value={url}
            name="url"
            placeholder='Add an url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit" >create</button>
      </form>
    </div>
  )
}
export default BlogForm


/* const addBlog=(event)=>{
    //const blog = blogs.find(n => n.title === title)
    event.preventDefault()
    createBlog({
        title: title,
        author: author,
        url: url
      }) */