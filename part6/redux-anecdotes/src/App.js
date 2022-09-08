/* import { useSelector, useDispatch } from 'react-redux'
import reducer from './reducers/anecdoteReducer'
import voteIncrease from './reducers/anecdoteReducer'
 */
import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification';
import Filter from './components/Filter';

import { initializeanecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
/* const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteIncrease(anecdotes))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
} */

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeanecdote()) 
  },[dispatch]) 
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App