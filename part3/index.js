const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(express.static('build'))
const personData = require('./models/person')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)// request.body is undefined!
/* let persons=[
   { 
     "id": 1,
     "name": "Arto Hellas", 
     "number": "040-123456"
   },
   { 
     "id": 2,
     "name": "Ada Lovelace", 
     "number": "39-44-5323523"
   },
   { 
     "id": 3,
     "name": "Dan Abramov", 
     "number": "12-43-234345"
   },
   { 
     "id": 4,
     "name": "Mary Poppendieck", 
     "number": "39-23-6423122"
   }
]  */
app.use(express.json())
app.use(cors())
app.use(morgan(':method  :url :status :res[content-length] - :response-time ms :content'))
morgan.token('content', (req) => {
  return JSON.stringify(req.body)
})

/* app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  }) */


/*   app.get('/api/persons', (req, res) => {
      res.json(persons)
  }) */
/* app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(per => per.id === id)
 
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
}) */
app.get('/api/persons', (req, res) => {
  personData.find({}).then(per => {
    res.json(per)
  })
})
app.get('/api/persons/:id', (req, res, next) => {
  personData.findById(req.params.id).then(per => {
    if (per) {
      res.json(per)
    } else {
      res.status(404).end()
    }
  })
    /* .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })  */
    .catch(error => next(error))
})
app.get('/api/info', (req, res) => {
  const date = new Date().toString()
  personData.find({}).then(person =>{res.send(`Phonebook has info for ${person.length} people <br><br> ${date}`)})
})
/* app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(per => per.id !== id)
  res.status(204).end()
}) */
/* app.post('/api/persons', (req, res) => {
  const body = req.body
const oldName = persons.find(p => p.name)
console.log('oldName',oldName.name)
  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'The name or number is missing' 
    })
  } else if(body.name===oldName.name) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })

  }
 
  const person = {
    id: Math.floor(Math.random() * 10000) + 1,
    name: body.name,
    number: body.number,
    
  }
 
  persons = persons.concat(person)
 
  res.json(person)
}) */
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'The name or number is missing'
    })
  }

  const person = new personData({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000) + 1,
  })

  person.save()
    .then(savedperson => {
      res.json(savedperson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  personData.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
      console.log('delete the data')
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  if (!body.number) {
    return res.status(400).json({
      error: 'The number is missing'
    })
  }
  const person = {
    name: body.name,
    number: body.number
  }
  console.log('person', personData.name)
  personData.findByIdAndUpdate(
    req.params.id,
    person,
    { new: true }
  )
    .then(updatedNumber => {
      res.json(updatedNumber)
    })
    .catch(error => next(error))
})
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 