import React from 'react'
import '@testing-library/jest-dom/extend-expect'
//import { render } from '@testing-library/react'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
describe('Blog renders', () => {

  const blog = {
    title: 'The test data',
    author: 'Rehan sharma',
    url: 'https://testapp.com',
    likes: '10',
  }

  //const { container } =render(<Blog blog={blog}/>)
  const mockHandler = jest.fn()
  test('renders the blogs title and author,', () => {

    const { container } =render(<Blog blog={blog}/>)
    const data = container.querySelector('.blog')
    expect(data).toHaveTextContent('The test data','Rehan sharma')
  })
  test('renders the blogs url and likes when button is clicked,',  async() => {
    render(<Blog blog={blog}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const title = screen.getByText('The test data')
    expect(title).toBeDefined()

    const author = screen.queryByText('Rehan sharma')
    expect(author).toBeDefined()

    const url = screen.queryByText('https://testapp.com')
    expect(url).toBeDefined()

    const likes = screen.queryByText('10')
    expect(likes).toBeDefined()
    /* const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const { container } =render(<Blog blog={blog}/>)

    const data = container.querySelector('.show')
    expect(data).toHaveTextContent('The test data','Rehan sharma','https://testapp.com','10') */
  })
  test('like button is clicked twice,',  async() => {

    render(<Blog blog={blog} updateBlog={mockHandler}/>)


    const user1 = userEvent.setup()
    const showButton = screen.getByText('view')
    console.log(showButton)
    await user1.click(showButton)

    // const user2 = userEvent.setup()
    const button = screen.getByText('like')
    console.log(button)
    await user1.click(button)
    await user1.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const input1 = screen.getByPlaceholderText('Add an content')
    const input2 = screen.getByPlaceholderText('Add an author')
    const input3 = screen.getByPlaceholderText('Add an url')
    const sendButton = screen.getByText('create')

    await user.type(input1, 'The test data...')
    await user.type(input2, 'Rehan sharma...')
    await user.type(input3, 'https://testapp.com...')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('The test data...')

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('Rehan sharma...')

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].url).toBe('https://testapp.com...')
  })
})