import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharDetails from "./components/CharDetails";
import AllChars from "./components/AllChars";
import bgVid from "./assets/videoplayback.webm";
import AllFilms from "./components/AllFilms";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [pages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [swData, setSwData] = useState([]);
  const [filmsData, setFilmData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const SW_API = `https://swapi.dev/api/people/?page=${currentPage}`;
  const FILMS_API = "https://swapi.dev/api/films/";

  useEffect(() => {
    async function fetchFilms() {
      const res = await fetch(FILMS_API);
      const data = await res.json();
      setFilmData(data.results);
    }

    async function fetchData() {
      try {
        const res = await fetch(SW_API);
        const data = await res.json();
        const characters = await Promise.all(
          data.results.map(async (character) => {
            const species = await Promise.all(
              character.species.map((url) =>
                fetch(url).then((res) => res.json())
              )
            );
            const starships = await Promise.all(
              character.starships.map((url) =>
                fetch(url).then((res) => res.json())
              )
            );
            const films = await Promise.all(
              character.films.map((url) => fetch(url).then((res) => res.json()))
            );
            return {
              ...character,
              species: species.map((s) => s.name).join(", ") || "No Data",
              starships:
                starships.map((s) => s.name).join(", ") || "No Starships",
              filmsUrl: character.films,
              films: films.map((m) => m.title).join(", ") || "No Data",
            };
          })
        );
        setLoading(false);
        setSwData(characters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchFilms();
    fetchData();
  }, [currentPage]);

  const handleCharacterSelect = (index) => {
    setCurrentIndex(index);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };
  const movieIdFromTitle = (title) => {
    const movie = filmsData.find((film) => film.title === title);
    return movie ? movie.url.split("/")[5] : "";
  };
  const filteredChars = selectedMovie
    ? swData.filter((character) =>
        character.filmsUrl.some((url) =>
          url.includes(movieIdFromTitle(selectedMovie))
        )
      )
    : swData;

  return (
    <Router>
      <div className="home-page">
        <h1 className="title">STAR WARS PEDIA</h1>
        {loading ? (
          <div style={{ textAlign: "center" }}>Loading ...</div>
        ) : (
          <>
            <AllFilms onSelect={handleMovieClick} films={filmsData} />
            {selectedMovie && (
              <div className="selected-movie">
                <h2>{selectedMovie.title}</h2>
                <p>Director: {selectedMovie.director}</p>
                <p>Producer: {selectedMovie.producer}</p>
                <p>Release Date: {selectedMovie.release_date}</p>
                <p>Opening Crawl: {selectedMovie.opening_crawl}</p>
              </div>
            )}
            <Suspense fallback={"Loading..."}>
              <Routes>
                <Route
                  path="/characters/:id"
                  element={<CharDetails swData={swData} />}
                />
              </Routes>
            </Suspense>
            <div className="pages-btn">
              <h2>Pages</h2>
              {pages.map((item) => (
                <button key={item} onClick={() => setCurrentPage(item)}>
                  {item}
                </button>
              ))}
            </div>{" "}
            {selectedMovie && (
              <p>
                Characters Starred in :{" "}
                <span className="selected-movie-span">
                  {selectedMovie.title}
                </span>
              </p>
            )}{" "}
            <AllChars
              onSelect={handleCharacterSelect}
              indexSet={setCurrentIndex}
              swData={filteredChars}
            />
          </>
        )}{" "}
        <video
          id="bgvideo"
          src={bgVid}
          className="background-video"
          autoPlay
          loop
          muted
        />
      </div>
    </Router>
  );
}

export default App;
