import React from "react";
import phonebookService from "../services/phonebook";

const Persons = ({ persons, searchName, setPersons }) => {
  const deletePerson = (id) => {
    let personName = persons.find((person) => person.id === id).name;
    if (window.confirm(`Delete ${personName}?`)) {
      phonebookService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <ul>
      {(searchName === ""
        ? persons
        : persons.filter((person) =>
            person.name.toLowerCase().startsWith(searchName.toLowerCase())
          )
      ).map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
