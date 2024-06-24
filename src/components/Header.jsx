import React from "react";

export default function Header({ film, stars, chars }) {
  return (
    <div className="header">
      <nav>
        <ul>
          <a onClick={chars} href="#characters">
            Characters
          </a>{" "}
          <a href="#starships" onClick={stars}>
            Starships
          </a>
          <a onClick={film}>Films</a>
        </ul>
      </nav>
    </div>
  );
}
