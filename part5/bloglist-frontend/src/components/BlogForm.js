import { useState } from 'react'

const BlogForm=({ createBlog }) => {

  const [title, setblogTitle] = useState('')
  const [author, setblogAuthor] = useState('')
  const [url, setblogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setblogTitle('')
    setblogAuthor('')
    setblogUrl('')
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
            onChange={({ target }) => setblogTitle(target.value)}
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
            onChange={({ target }) => setblogAuthor(target.value)}
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
            onChange={({ target }) => setblogUrl(target.value)}
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