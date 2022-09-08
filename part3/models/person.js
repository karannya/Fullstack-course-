const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB',result)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

/* const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
}) */
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true

  },
  number: {
    type: String,
    minLength: 8,
    match: /^\d{3}-\d{5}$|^\d{2}-\d{6}$/,
    required: true
  }

})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)