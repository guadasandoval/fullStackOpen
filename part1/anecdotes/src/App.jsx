import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const MostVotes = (props) =>{
  return(
    <div>
      <h1>Anecdote with most votes</h1>
    <br />
    <h2>{props.anecdote}</h2>
    <h3>has {props.maxVote} votes</h3>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const votes = Array(anecdotes.length).fill(0) // completa con 0
  const [selected, setSelected] = useState(0)
  const [anecdotesVotes, setVotes] = useState(votes)

  const handleRandom = () =>{
    let index = Math.floor(Math.random()*anecdotes.length);
    return setSelected(index)
  }
  const handleVote = () =>{
    const copyAnecdotes = [...anecdotesVotes] // hace una copia del estado original
    copyAnecdotes[selected] += 1
    setVotes(copyAnecdotes)
  }
  const mostVotes = ()=>{
    let indexAnecdote = 0;
    let maxVotes = anecdotesVotes[0];
    for (let index = 0; index < anecdotesVotes.length; index++) {
      if(anecdotesVotes[index]> maxVotes){
        maxVotes = anecdotesVotes[index];
        indexAnecdote = index;
      }
    }
    return {maxVotes, indexAnecdote};
  }

  return (
    <>
    <h1>{anecdotes[selected]}</h1>
    {anecdotesVotes[selected] > 1 ? (
      <p>Has {anecdotesVotes[selected]} votes</p>
    ): (<p>Has {anecdotesVotes[selected]} vote</p>)}
    <Button onClick={handleVote} text="vote"/>
    <button onClick={handleRandom}>next anecdote</button>
    <MostVotes anecdote={anecdotes[mostVotes().indexAnecdote]} maxVote={mostVotes().maxVotes}/>
    </>
  )
}

export default App