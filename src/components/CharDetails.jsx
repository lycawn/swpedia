import React from "react";
import { useParams } from "react-router-dom";

function CharDetails({ swData }) {
  const { id } = useParams();
  const character = swData[parseInt(id) - 1];

  if (!character) return <div>Character not found</div>;

  return (
    <div className="char-details-container">
      <h1>Character Details</h1>
      <h2>{character.name}</h2>
      <div>
        <span className="info-label">Height:</span> {character.height}
      </div>
      <div>
        <span className="info-label">KG:</span> {character.mass}
      </div>
      <div>
        <span className="info-label">Hair Color:</span> {character.hair_color}
      </div>
      <div>
        <span className="info-label">Skin Color:</span> {character.skin_color}
      </div>
      <div>
        <span className="info-label">Eye Color:</span> {character.eye_color}
      </div>
      <div>
        <span className="info-label">Birth Year:</span> {character.birth_year}
      </div>
      <div>
        <span className="info-label">Gender:</span> {character.gender}
      </div>
      <div>
        <span className="info-label">Species:</span> {character.species}
      </div>
      <div>
        <span className="info-label">Starships:</span> {character.starships}
      </div>{" "}
      <div>
        <span className="info-label">Movies:</span> {character.films}
      </div>
    </div>
  );
}

export default CharDetails;
