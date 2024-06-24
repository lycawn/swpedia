import React from "react";
import { useParams } from "react-router-dom";

function CharDetails({ swData }) {
  const { id } = useParams();
  const character = swData[parseInt(id) - 1];

  if (!character) return <div>Character not found</div>;

  const characterAttributes = [
    { label: "Height", key: "height" },
    { label: "KG", key: "mass" },
    { label: "Hair Color", key: "hair_color" },
    { label: "Skin Color", key: "skin_color" },
    { label: "Eye Color", key: "eye_color" },
    { label: "Birth Year", key: "birth_year" },
    { label: "Gender", key: "gender" },
    { label: "Species", key: "species" },
    { label: "Starships", key: "starships" },
    { label: "Movies", key: "films" },
  ];

  return (
    <div className="char-details-container">
      <h1>Character Details</h1>
      <h2>{character.name}</h2>
      {characterAttributes.map(({ label, key }) => (
        <div key={key}>
          <span className="info-label">{label}:</span> {character[key]}
        </div>
      ))}
    </div>
  );
}

export default CharDetails;
