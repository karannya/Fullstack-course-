/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} 
const initialState = anecdotesAtStart.map(asObject)*/


import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'


const ancdoteslice= createSlice({
  name:'anecdote',
  initialState: [],
  reducers:{
    voteIncrease(state , action){
    const id = action.payload.id
    return state.map(
      (anecdote) =>
        anecdote.id !== id ? anecdote : {...anecdote, votes: anecdote.votes + 1 } 
    )
    
     
  },
   appendanecdotes(state, action) {
    state.push(action.payload)
  },
  setanecdotes(state, action) {
    return action.payload
  }
}
})
export const { voteIncrease, appendanecdotes, setanecdotes } = ancdoteslice.actions
export const initializeanecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch(setanecdotes(anecdotes))
  }
}

export const addAnecdote = object => {
  
  return async dispatch => {
    const newanecdotes = await anecdoteService.create(object)
    dispatch(appendanecdotes(newanecdotes))
  }
}

export const voteAdd = (anecdote) => {
  console.log(anecdote)
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.increaseVote(anecdote);
    console.log(votedAnecdote)
    dispatch(voteIncrease(votedAnecdote));
  };
};


export default ancdoteslice.reducer











 