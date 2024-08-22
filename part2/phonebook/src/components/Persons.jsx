import React from "react";

const Persons = ({ persons, searchName }) => {
  return (
    <ul>
      {(searchName === ""
        ? persons
        : persons.filter((person) =>
            person.name.toLowerCase().startsWith(searchName.toLowerCase())
          )
      ).map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
