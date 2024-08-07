import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) =>(
      <tr>
        <td>{props.text} {props.value}</td>
      </tr>
)


const Statistics = (props) => {
if (props.total !=0) {
 return (
    <> 
    <thead>
    <tr>
    <th>Statistics</th>
    </tr>
  </thead>
    <tbody>
      <StatisticsLine text='Good' value={props.good}/>
      <StatisticsLine text='Neutral' value={props.neutral}/>
      <StatisticsLine text='Bad' value={props.bad}/>
      <StatisticsLine text='Total' value={props.total}/>
      <StatisticsLine text='Average' value={props.good - props.bad / props.total}/>
      <StatisticsLine text='Positive' value={(props.good / props.total)*100}/>
    </tbody>
    </>
  )
} return (
  <tbody>
     <tr>
      <td>No feedback given</td>
     </tr>
  </tbody>
  
)
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const setToValueGood = () => {
    const updateValue = good + 1
    setGood(updateValue)
    setTotal(updateValue + neutral + bad)
  }

  const setToValueNeutral = () => {
    const updateValue = neutral + 1
    setNeutral(updateValue)
    setTotal(good + updateValue + bad)
  }

  const setToValueBad = () => {
    const updateValue = bad + 1
    setBad(updateValue)
    setTotal(good + updateValue + neutral)
  }

  

  return (
    <>
     <h1>Give feedback</h1>
    <Button handleClick={setToValueGood} text={'good'}></Button>
    <Button handleClick={setToValueNeutral} text={'neutral'}></Button>
    <Button handleClick={setToValueBad} text={'bad'}></Button>
    <table>
      <Statistics good={good} bad={bad} neutral={neutral} total={total}/>  
    </table>
    
    </>
  )
}

export default App
