/* eslint-disable react/prop-types */
const Person = ({person}) =>{
    <p>{person.name} {person.number}</p>
}

const Persons = ({persons, filter}) => {
    const personFilter = persons.filter((person) => {person.name.toLowerCase() === filter.toLowerCase()})

    return(
    <>
    <h2>Numbers</h2>
    {personFilter.map((person) => <Person key={person.name} person={person}/>)}
    </>
    )
}

export default Persons;

  