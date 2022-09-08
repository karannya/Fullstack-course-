import { useState } from 'react'
const Blog = ({ blog,deleteBlog, updateBlog }) => {
  const [ view, setView ] = useState(false)


  const label = !view ? 'view' : 'hide'
  const handleView = () => {

    setView(!view)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  if (view ) {
    return(

      <div  style={blogStyle} className='show' >

        <div> {blog.title}<button onClick={handleView} className='hello'>{label}</button></div>

        <div>{blog.url}</div>

        <div >likes {blog.likes}<button id='like-btn' onClick={updateBlog}>like</button></div>
        <div>{blog.author}</div>

        <button id='remove-btn' value={blog.id} onClick={deleteBlog} >remove</button>
      </div>
    )
  }
  return(
    <div className='blog'>

      {blog.title} {blog.author}
      <button onClick={handleView} >{label}</button>
    </div>
  )
}
export default Blog