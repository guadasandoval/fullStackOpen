import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = ()=>{
  const [ persons, setPersons ] = useState([]) 
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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
