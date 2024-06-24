import React from "react";

export default function AllFilms({ films, onSelect }) {
  const handleChange = (event) => {
    const selectedFilmTitle = event.target.value;
    const selectedFilm = films.find((film) => film.title === selectedFilmTitle);
    onSelect(selectedFilm);
  };

  return (
    <div className="all-films">
      <select className="film-dropdown" onChange={handleChange}>
        <option value="">Select a film</option>
        {films.map((film) => (
          <option key={film.title} value={film.title}>
            {film.title}
          </option>
        ))}
      </select>
    </div>
  );
}
