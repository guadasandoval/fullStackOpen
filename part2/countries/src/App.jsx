/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'

const DataCountry = ({country}) =>{ 
  const [weather, setWeather] = useState('')
  useEffect(()=>{
    axios
    .get('http://api.weatherstack.com/current?access_key=13ea5bbdecd480c07a973ab7acee24ee&query = New York')
    //.get(baseUrl + '? access_key = ' + access_key + '& query = ' + country[0].capital)
    .then(response => {
      setWeather(response.data)
    })
  })
  console.log(weather);
  return(
    <div>
      <h2>{country[0].name.common}</h2>
      <p>Capital: {country[0].capital}</p>
      <p>Population: {country[0].population}</p>
      <h3>Languages:</h3>
      <img src={country[0].flags.png} alt={country[0].flags.alt} />
    </div>
  )
}



const CountriesFilter = ({countries, filter}) => {
  const [componentShow, setComponentshow] = useState(null);
  const filteredCountries = countries.filter(dataCountry => dataCountry.name.common.toLowerCase().includes(filter.toLowerCase()))

  const handleShow=(component) => {
  setComponentshow(component)
  console.log(componentShow);
  }

  if(filteredCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if(filteredCountries.length == 1){
    return(
      <div>
         <h1>Country</h1>
         <DataCountry country={filteredCountries}/>
      </div>
    )
  }
  else {
    return(
    <div>
      <h1>Filtered</h1>
      <ul>
        {filteredCountries.map(country => (
          <li key={country.ccn3}>
            {country.name.common}
            <button onClick={()=>handleShow(<DataCountry country={country}/>)}>Show</button>
          </li>
        ))} 
      </ul>
    </div>
  )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])

  const handleFilter = (event) => {
    event.preventDefault();
    setFilter(event.target.value)
  }

  return (
    <>
        <h2>Find countries</h2>
        <input type="text" placeholder='Search country' onChange={handleFilter} value={filter}/>
        <CountriesFilter countries={countries} filter={filter}/>
    </>
  )
}

export default App
