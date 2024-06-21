import React from "react";
import { Link } from "react-router-dom";

function AllChars({ swData, onSelect, indexSet }) {
  return (
    <div className="char-selector">
      {swData.map((character, index) => (
        <div key={index} className="char-item" onClick={() => onSelect(index)}>
          <Link onClick={indexSet} to={`/characters/${index + 1}`}>
            {character.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default AllChars;
