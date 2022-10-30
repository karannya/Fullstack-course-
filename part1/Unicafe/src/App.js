import React from "react";
import { useState } from "react";

//Respective buttons for the feedback
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

// Calculate the total, avg, positive percentage of feedback
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = ((good*1)+(neutral*0)+(bad* (-1)) )/ all;
  const positive = (good / all) * 100;
  if (all === 0) {
    return (
      <div>
        <h3>No feedback given</h3>
      </div>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="avg" value={avg} />
          <StatisticLine text="positive" value={positive} per={'%'} />
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({ text, value, per }) => {
  return (
    <>

      <tr>
        <td>{text}</td>
        <td>{value} {per}</td>
      </tr>

    </>
  )
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const goodCount = () => {
    setGood(good + 1)
  }
  const neutralCount = () => {
    setNeutral(neutral + 1)
  }
  const badCount = () => {
    setBad(bad + 1)
  }
  
  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={goodCount} text='good' />
      <Button onClick={neutralCount} text='neutral' />
      <Button onClick={badCount} text='bad' />
      {/* <button onClick={goodCount}>good</button>
      <button onClick={neutralCount}>neutral</button>
      <button onClick={badCount}>bad</button> */}
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      {/* good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
       all {all}<br />
      avg {avg}<br />
      per {per} */}
    </>
  );
}

export default App;
