import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
//import axios from 'axios';
import personsService from './services/persons'
import Notification from './components/Notification'
function App() {
  /* const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])  */
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [filtered, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    console.log('effect')
    /* axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      }) */
    personsService
      .getAll()
      .then(newPerson => {
        setPersons(newPerson)

      }, [])
      .catch(error => {
        setErrorMessage({
          text: 'Error in fetching data from backend ',
          type: 'error'
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
    // .catch((error) => console.error(error)); 

  }, [])

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      //id: Math.floor(Math.random() * 10000),
    }

    const alertmessage = `${newName} is already added to phonebook, replace the old number with a new one?`

    const present = persons.find(item => item.name === newName)
    const updatedPerson = { ...present, number: newNumber };

    if (present) {

      alert(alertmessage)
      console.log('updatedPerson', updatedPerson)


      personsService
        .update(present.id, updatedPerson)
        .then(returnedPerson => {
          console.log('returnedPerson', returnedPerson)
          setPersons(persons.map(p => p.id !== present.id ? p : returnedPerson))

          setErrorMessage({
            text: `Updated ${present.name} succeessfully `,
            type: 'success'
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 404) {
            setErrorMessage({
              text: `${present.name} has already been removed from server`,
              type: 'error'
            });
            setTimeout(() => setErrorMessage(null)
              , 5000)
            setPersons(persons.filter(n => n.name !== present.name))
          } else {
            setErrorMessage({
              text: error.response.data.error,
              type: "error",
            });
            console.error(error.response.data);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          }

        });
      setNewName('')
      setNewNumber('')
    }
    else {
      personsService
        .create(nameObject)
        .then(returnedName => {
          console.log(returnedName)
          setPersons(persons.concat(returnedName))

          setErrorMessage({
            text: `Added ${nameObject.name} `,
            type: 'success'
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage({
            text: error.response.data.error,
            type: "error",
          });
          console.error(error.response.data);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });


      setNewName('')
      setNewNumber('')
    }
  }
  const handleAddName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }
  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleAddFilter = (event) => {
    setFilter(event.target.value)

  }

  const searchfilter = !filtered
    ? persons
    : persons.filter((item) =>
      item.name.toLowerCase().includes(filtered.toLowerCase())
    );

  const deleteInfo = (id) => {
    //setPersons(persons.filter(person => person.id !== id))
    console.log(persons)
    const personname = persons.find(person => person.id === id)
    //setPersons(persons.filter(person => person.id !== personname.id))
    console.log(personname.name, personname.id)
    const message = `Delete ${personname.name}?`
    if (window.confirm(message) === true) {
      personsService
        .remove(id)
        .then(response => {

          setPersons(persons.filter(person => person.id !== id))

          setErrorMessage({
            text: `${personname.name} is removed from server`,
            type: 'success'
          });
          setTimeout(() => setErrorMessage(null)
            , 5000);

        })

        .catch(error => {
          //console.log('error')
          console.log(error)
          setErrorMessage({
            text: `'${personname.name}' has already been removed from server`,
            type: 'error'
          });
          setTimeout(() => setErrorMessage(null)
            , 5000);
          setPersons(persons.filter(person => person.id !== personname.id))
        })


    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={filtered} onChange={handleAddFilter} />
      {/* <ul>
        {persons.filter(filteredItems).map((user) => {
          return <li key={user.id}>
            {user.name}
          </li>
        })}
      </ul> */}
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleAddName={handleAddName}
        newNumber={newNumber} handleAddNumber={handleAddNumber} />
      <h2>Numbers</h2>
      <ul>

        {console.log(searchfilter, 'searchfilter')}
        {searchfilter.map(names =>
          <Persons key={names.id} names={names} deleteInfo={() => deleteInfo(names.id)} />
        )}

      </ul>
    </div>
  );
}

export default App;

