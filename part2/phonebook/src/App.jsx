import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [addPersonMessage, setAddPersonMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addNumber = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };
        phonebookService
          .update(person.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== response.id ? person : response
              )
            );
          })
          .then(() => {
            setAddPersonMessage(`Updated ${newName}'s number to ${newNumber}`);
            setTimeout(() => {
              setAddPersonMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setIsError(true);
            setAddPersonMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setAddPersonMessage(null);
              setIsError(false);
            }, 5000);
            setPersons(persons.filter((person) => person.name !== newName));
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      phonebookService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response));
        })
        .then(() => {
          setAddPersonMessage(`Added ${newName}`);
          setTimeout(() => {
            setAddPersonMessage(null);
          }, 5000);
        });
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleNameSearch = (event) => {
    console.log(searchName);
    setSearchName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addPersonMessage} error={isError} />
      <Filter searchName={searchName} handleNameSearch={handleNameSearch} />
      <h2>add a new</h2>
      <PersonForm
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchName={searchName}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
