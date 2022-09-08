import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { voteAdd } from '../reducers/anecdoteReducer';
import {createNotification} from '../reducers/notificationReducer'
const AnecdotesList = (props) => {
  const filtered= useSelector(state => state.filter.toLowerCase())
  const anecdotes =useSelector((state) => state.filter
                                    ? state.anecdotes.filter((anecdote) =>
                                    anecdote.content.toLowerCase().includes(filtered))
                                    :state.anecdotes
                                     )
    //const anecdotes = useSelector(state => state.anecdotes)
    const anecdotessorted = [...anecdotes].sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch();
     const vote = (anecdote) => {
      console.log(anecdote)
		dispatch(voteAdd(anecdote));
    dispatch(createNotification(`You voted '${anecdote.content}'`));
		//dispatch(deleteNotification(5000))
	}; 
    return(
  
      anecdotessorted.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
              
            </div>
          
        ))
    
    )
}

export default AnecdotesList