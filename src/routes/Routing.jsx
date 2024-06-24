import React from "react";
import { Route, Routes } from "react-router-dom";
import CharDetails from "../components/CharDetails";
import StarshipDetails from "../components/StarshipDetails";

export default function Routing({ swData, starship }) {
  return (
    <>
      <Routes>
        <Route
          path="/characters/:id"
          element={<CharDetails swData={swData} />}
        />
        <Route
          path="/starships/:id"
          element={<StarshipDetails starship={starship} />}
        />
      </Routes>
    </>
  );
}
