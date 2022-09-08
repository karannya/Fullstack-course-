const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password and data an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Annya:${password}@cluster0.t5geb8c.mongodb.net/phoneApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected',result)

  })
  .catch((err) => console.log(err))
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => console.log(person.name, person.number))
    mongoose.connection.close()
  })
  
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save()
    .then(() => {
      console.log(`Added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
}  

 