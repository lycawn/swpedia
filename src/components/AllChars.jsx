import React from "react";
import { Link } from "react-router-dom";

function AllChars({ swData, onSelect }) {
  return (
    <div className="char-selector">
      {swData.map((character, index) => (
        <div key={index} className="char-item" onClick={() => onSelect(index)}>
          <Link to={`/characters/${index + 1}`}>
            <a>{character.name}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default AllChars;
