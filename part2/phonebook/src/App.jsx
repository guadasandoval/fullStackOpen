import { useState } from 'react'


const App = ()=>{
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event)=>{
    event.preventDefault()
    console.log(persons.includes(newName));
    if(!persons.includes(newName)){      
      const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    } else{
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
   
  }
  const handleFilter = (event) =>{
    console.log(event.target.value);
    let filter = persons.filter(person => person.name === event.target.value)
    console.log(filter);
    //return setPersons(filter)
  }
  const handlePersonChange = (event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }

 return(
    <>
    <h2>Phonebook</h2>
    <div>filter shown with a: <input onChange={handleFilter} /></div>
    <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
      <div>debug: {newName} {newNumber}</div>
    </>
  )
}

export default App
