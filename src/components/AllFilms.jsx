import React from "react";

export default function AllFilms({ films, onSelect }) {
  const handleChange = (event) => {
    const selectedFilm = films[event.target.value];
    onSelect(selectedFilm);
  };

  return (
    <div className="all-films">
      <select className="film-dropdown" onChange={handleChange}>
        <option value="">Select a film</option>
        {films.map((film, index) => (
          <option key={index} value={index}>
            {film.title}
          </option>
        ))}
      </select>
    </div>
  );
}
