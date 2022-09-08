/* import React from 'react';
import {  useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer';
import {createNotification,deleteNotification} from '../reducers/notificationReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const Addcontent=async (event)=>{
        event.preventDefault();
        const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(addAnecdote(content));
    dispatch(createNotification(`New anecdote added: ${content}`));
    dispatch(deleteNotification())
  
    }; 
    return(
        <div>
            <h2>create new</h2>
      <form onSubmit={Addcontent}>
        <div><input type="text" name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
        </div>

    )
}

export default AnecdoteForm */

import React from 'react';
import { connect } from "react-redux";
import { addAnecdote } from '../reducers/anecdoteReducer';
import {createNotification} from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {
   
    const Addcontent=async (event)=>{
        event.preventDefault();
        const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		props.addAnecdote(content);
    props.createNotification(`New anecdote added: ${content}`);
    //props.deleteNotification(5000)
  
    }; 
    return(
        <div>
            <h2>create new</h2>
      <form onSubmit={Addcontent}>
        <div><input type="text" name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
        </div>

    )
}

const mapStateToProps = null
  const mapDispatchToProps ={
    addAnecdote,
    createNotification,
    //deleteNotification
  }
  const ConnectedFilters = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
   export default ConnectedFilters

