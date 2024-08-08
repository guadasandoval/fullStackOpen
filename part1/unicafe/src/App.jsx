import { useState } from 'react'

const Button = ({text, onClick}) =>{
  return(
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

const StatisticsLine = ({text, value}) =>{
  return <p>{text} {value}</p>
}

const Statistics = (props) => {
  if(props.total === 0 ){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <>
     <StatisticsLine text="Good: " value={props.good}/>
     <StatisticsLine text="Neutral: " value={props.neutral}/>
     <StatisticsLine text="Bad: " value={props.bad}/>
     <StatisticsLine text="Total: " value={props.total}/>
     <StatisticsLine text="Average: " value={(props.good - props.bad)/ props.total}/>
     <StatisticsLine text="Positove: " value={props.good / props.total}/>
    </>
 
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () =>{
    const updateValue = good + 1
    setGood(updateValue)
    setTotal(total+1)
  }

  const handleNeutral = () =>{
    setNeutral(neutral+1)
    setTotal(total+1)
  }
  const handleBad = () =>{
    setBad(bad+1)
    setTotal(total+1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" onClick={handleGood}/>
      <Button text="neutral" onClick={handleNeutral}/>
      <Button text="bad" onClick={handleBad}/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
    </div>
  )
}

export default App