require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "menta",
      "number": "123456",
      "id": 5
    }
  ]



  //middlewares
  app.use(express.json())
  app.use(morgan('tiny'))
  morgan.token('body', (req, res) => JSON.stringify(req.body))
  app.use(cors())
  app.use(express.static('dist'))





  //endpoints
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons =>{
      response.json(persons)
    })
  })

  let cantSol = 0
  app.get('/info', (request, response)=>{
   cantSol++
    let date = new Date()
    response.send(`<h1>Phonebook has info for ${cantSol} people</h1> \n <h2>${date}</h2>`)
  })

  app.get('/api/persons/:id', (request, response) =>{
    const idPerson = Number(request.params.id)
    const person = persons.find(person => person.id === idPerson)
    if(person){
      response.json(person)
    } else{
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response, next)=> {
    const idPerson = Number(request.params.id)
    const newPersonsList = persons.filter((person)=> person.id !== idPerson)
    Person.findByIdAndDelete(request.params.id)
    .then(result =>{
       response.status(204).end()
    })
    .catch(error =>next(error))
  })
  
  //check if repeat numbers
  const generateId = () => {
    const uid = Math.floor(Math.random() * 999999);
     return uid
  }

  app.post('/api/persons', (request, response)=>{
   const body = request.body
   if(body.content){
    return response.status(400).json({
      error: 'missing content'
    }) 
   }
   if(body.name === "" || body.number === ""){
    return response.status(400).json({
      error: 'there can be no empty fields'
    }) 
   }
   if(persons.find((p)=> p.name === body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
   }
   const newPerson = {
      name: body.name,
      number: body.number,
      id: generateId()
    }

   persons = persons.concat(newPerson)
   response.json(newPerson)

  })

  app.put('api/persons/:id', (request, response, next) => {
    const body = request.body
    const personUpdate = {
      name: body.name,
      number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, personUpdate, {new:true})
    .then(personUpdateResponse =>{
      response.json(personUpdateResponse)
    })
    .catch(error => next(error))
  })


  module.exports = mongoose.model('Person', personSchema)
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
