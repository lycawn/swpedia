import React from "react";
import { useParams } from "react-router-dom";

function StarshipDetails({ starship }) {
  const { id } = useParams();

  if (!starship) return <div>Starship not found</div>;

  return (
    <div className="starship-details-container">
      {" "}
      <h1>Starship Details</h1>
      <h2>{starship.name}</h2>
      <div>
        <span className="info-label">Model:</span> {starship.model}
      </div>
      <div>
        <span className="info-label">Manufacturer:</span>{" "}
        {starship.manufacturer}
      </div>
      <div>
        <span className="info-label">Cost in Credits:</span>{" "}
        {starship.cost_in_credits}
      </div>
      <div>
        <span className="info-label">Length:</span> {starship.length}
      </div>
      <div>
        <span className="info-label">Crew:</span> {starship.crew}
      </div>
      <div>
        <span className="info-label">Passengers:</span> {starship.passengers}
      </div>
      <div>
        <span className="info-label">Max Atmosphering Speed:</span>{" "}
        {starship.max_atmosphering_speed}
      </div>
      <div>
        <span className="info-label">Cargo Capacity:</span>{" "}
        {starship.cargo_capacity}
      </div>
      <div>
        <span className="info-label">Consumables:</span> {starship.consumables}
      </div>
      <div>
        <span className="info-label">Hyperdrive Rating:</span>{" "}
        {starship.hyperdrive_rating}
      </div>
      <div>
        <span className="info-label">MGLT:</span> {starship.MGLT}
      </div>
      <div>
        <span className="info-label">Starship Class:</span>{" "}
        {starship.starship_class}
      </div>
    </div>
  );
}

export default StarshipDetails;
