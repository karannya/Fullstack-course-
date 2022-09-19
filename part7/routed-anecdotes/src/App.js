import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import  { useField } from './hooks'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
     
      
    </div>
  )
}
const ClikedAnecdote = ({ anecdote,vote }) => {

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author} </h2>
      <div>has {anecdote.votes} votes</div><br></br>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div><br></br>
    </div>
  )
}
const AnecdoteList = ({ anecdotes,vote }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        <button onClick={() => vote(anecdote.id)}>vote</button>
        </li>
        )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
 /*  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('') */
  let navigate = useNavigate();
  const { reset: resetContent, ...content} = useField('text')
  const { reset: resetAuthor, ...author} = useField('text')
  const { reset: resetInfo, ...info} = useField('text')
  
 

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    
    /* setContent('')
    setAuthor('')
    setInfo('') */
    
    navigate("/");
    
  }
  const resetClick = () => {
    resetContent()
    resetAuthor()
    resetInfo()
    
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      {/* <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button type="submit"  >create</button>
        
      </form> */}
      <form onSubmit={handleSubmit}>
        content:
      <input {...content}/>
      <br/>
      author:
        <input {...author}/>
        <br/>
        info:
        <input {...info}/>
        <br/>
        <button type="submit"  >create</button>
        <button type="reset" value='reset' onClick={resetClick}>reset</button>
      </form>
      
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  //let navigate = useNavigate();
  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`new anecdote created ${anecdote.content}`)
    // navigate("/");
    setTimeout(() => {
      setNotification('')
    }, 5000);  
  }
  
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  

  return (
    <div>
      <Menu />
      {notification}
      <Routes>
      <Route path="/anecdotes/:id" element={<ClikedAnecdote anecdote={anecdote}  vote={vote}/>} />
     <Route path="/" element={<AnecdoteList anecdotes={anecdotes} vote={vote}/>} />
     <Route path="/create" element={<CreateNew addNew={addNew}/>} />
     <Route path="/about" element={<About /> } />
     </Routes>
     <Footer />
    </div>
  )
}

export default App