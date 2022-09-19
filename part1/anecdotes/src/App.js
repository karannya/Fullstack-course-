import { useState } from 'react';
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const MaximumVote = ({ anecdotes, points }) => {
  //const maxKey=points.findIndex(maxValue)
  let maxKey = points.indexOf(Math.max(...points))
  return (
    <div>
      {anecdotes[maxKey]} <br /> has {points[maxKey]} vote
    </div>
  )
}
function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).fill(0))
  const clickMe = () => {
    let randomNumber = Math.floor(Math.random() * (anecdotes.length));
    setSelected(randomNumber)
  }
  const voteCount = () => {
    let totalPoints = [...points]
    console.log(totalPoints)
    console.log(selected)
    totalPoints[selected] += 1
    /* let a= Math.max(...totalPoints)
     console.log('a',a) */
    setPoints(totalPoints);
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br /> has {points[selected]} votes <br />
      <Button onClick={voteCount} text='vote' />
      <Button onClick={clickMe} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <MaximumVote anecdotes={anecdotes} points={points} selected={selected} />
    </div>
  );
}

export default App;
