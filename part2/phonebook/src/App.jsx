import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = ()=>{
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event)=>{
    event.preventDefault()
    if(persons.find((person)=> person.name === newName)){ 
       alert(`${newName} is already added to phonebook`)
       setNewName('')
       setNewNumber('')  
    } else{
      const newPerson = {
      name: newName,
      number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
   
  }
  const handleFilter = (event) =>{
    setFilter(event.target.value)
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
    <Filter filterName={filter} handleFilter={handleFilter}/>
    <h2>Add a new</h2>
    <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange}/>
    <Persons persons={persons} filter={filter}/>
    </>
  )
}

export default App
