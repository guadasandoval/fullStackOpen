const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }

  const password = process.argv[2]

const url =
`mongodb+srv://guadastoop:${password}@cluster0.exxmonk.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
  })

  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result =>{
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close()
  })

  if (process.argv.length === 3) {
   Person.find({}).then(result => {
    console.log('Phonebook:');
    result.forEach(p =>{
        console.log(p.name + ' ' + p.number);
    }) 
    mongoose.connection.close()
   })
  }