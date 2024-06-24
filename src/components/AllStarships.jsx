import React from "react";
import { Link } from "react-router-dom";

function AllStarships({ onSelect, starships }) {
  return (
    <div className="all-starships">
      <h2>All Starships </h2>

      <ul>
        {starships.map((starship, index) => (
          <li key={index}>
            <Link
              to={`/starships/${index + 1}`}
              onClick={() => onSelect(starship)}
            >
              {starship.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllStarships;
