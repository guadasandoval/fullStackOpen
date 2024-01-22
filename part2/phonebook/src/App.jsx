import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonService from './services/PersonService'


const App = ()=>{
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event)=>{
    event.preventDefault()
    if(persons.find((person)=> person.name === newName)){   
      if(alert(`${newName} is already added to phonebook, replace a old number with a new one?`)){
        const personFound = persons.find((person)=> person.name === newName)
        const newPerson = {...personFound, number: newNumber}
          PersonService.update(newPerson.id, newPerson)
          .then(returnPerson => setPersons(persons.map(personUpdate => personUpdate.id !== newPerson.id ? personFound : returnPerson)),
            setNewName(''),
            setNewNumber('') 
            )
          } 
       } else{
      const newPerson = {
      name: newName,
      number: newNumber
      }
      PersonService.create(newPerson)
      .then(returnPerson => 
        setPersons(persons.concat(returnPerson),
        setNewName(''),
        setNewNumber('')
        ))
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

  const handleDelete = personDelete => {
    if(window.confirm(`Delete ${personDelete.name} ?`)){
    PersonService
    .deletePerson(personDelete.id)
    .then(response => {setPersons(persons.filter(person => person.id !== personDelete.id ? person : response ))})
    }
}

  useEffect(() => {
   PersonService
   .getAll()
   .then(response => setPersons(response))
  }, [])

 return(
    <>
    <h2>Phonebook</h2>
    <Filter filterName={filter} handleFilter={handleFilter}/>
    <h2>Add a new</h2>
    <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange}/>
    <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </>
  )
}

export default App
