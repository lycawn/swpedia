import React from "react";
import { useParams } from "react-router-dom";

function StarshipDetails({ starship }) {
  const { id } = useParams();

  if (!starship) return <div>Starship not found</div>;

  const starshipAttributes = [
    { label: "Model", key: "model" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Cost in Credits", key: "cost_in_credits" },
    { label: "Length", key: "length" },
    { label: "Crew", key: "crew" },
    { label: "Passengers", key: "passengers" },
    { label: "Max Atmosphering Speed", key: "max_atmosphering_speed" },
    { label: "Cargo Capacity", key: "cargo_capacity" },
    { label: "Consumables", key: "consumables" },
    { label: "Hyperdrive Rating", key: "hyperdrive_rating" },
    { label: "MGLT", key: "MGLT" },
    { label: "Starship Class", key: "starship_class" },
  ];

  return (
    <div className="starship-details-container">
      <h1>Starship Details</h1>
      <h2>{starship.name}</h2>
      {starshipAttributes.map(({ label, key }) => (
        <div key={key}>
          <span className="info-label">{label}:</span> {starship[key]}
        </div>
      ))}
    </div>
  );
}

export default StarshipDetails;
