import React from "react";

const Filter = ({ searchName, handleNameSearch }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={searchName} onChange={handleNameSearch} />
    </div>
  );
};

export default Filter;
