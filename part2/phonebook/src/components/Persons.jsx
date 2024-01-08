/* eslint-disable react/prop-types */
const Person = ({person, handleDelete}) =>{
    return(
    <div>
        <p>{person.name} {person.number}</p>
        <button key={person.id} onClick={()=>handleDelete(person)}>Delete phone</button>
    </div>
    )
}

const Persons = ({persons, filter, handleDelete}) => {
    const personFilter = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    
    return(
    <>
    <h2>Numbers</h2>
    {personFilter.map((person) => <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
    </>
    )
}

export default Persons;

  