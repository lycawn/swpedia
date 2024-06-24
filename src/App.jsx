import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharDetails from "./components/CharDetails";
import AllChars from "./components/AllChars";
import bgVid from "./assets/videoplayback.webm";
import AllFilms from "./components/AllFilms";
import Header from "./views/Header";
import AllStarships from "./components/AllStarships";
import StarshipDetails from "./components/StarshipDetails";
import lucreHulk from "./assets/lucrehulk.webm";
import Routing from "./routes/Routing";
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [swData, setSwData] = useState([]);
  const [filmsData, setFilmData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollUp, setScrollUp] = useState(false);
  const [starshipsData, setStarshipsData] = useState([]);
  const [selectedStarship, setSelectedStarship] = useState(null);
  const [showFilm, setFilmShow] = useState(false);
  const [showChars, setShowChars] = useState(true);

  const SW_API = `https://swapi.dev/api/people/?page=${currentPage}`;
  const FILMS_API = "https://swapi.dev/api/films/";
  const STARSHIPS_API = "https://swapi.dev/api/starships/";

  const handleFilmShow = () => {
    setFilmShow(!showFilm);
    setSelectedMovie(null);
  };

  const handleToggleChars = () => {
    setShowChars(true);
  };
  const handleToggleStarships = () => {
    setShowChars(false);
  };

  useEffect(() => {
    async function fetchFilms() {
      try {
        const res = await fetch(FILMS_API);
        const data = await res.json();
        setFilmData(data.results);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    }

    async function fetchStarships() {
      try {
        const res = await fetch(STARSHIPS_API);
        const data = await res.json();
        setStarshipsData(data.results);
      } catch (error) {
        console.error("Error fetching starships:", error);
      }
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
              filmsUrl: films.map((m) => m.url),
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
    fetchStarships();
    fetchData();

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrollUp(true);
      } else {
        setScrollUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, selectedMovie]);

  const handleCharacterSelect = (index) => {
    setCurrentIndex(index);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleStarshipSelect = (starship) => {
    setSelectedStarship(starship);
  };

  const movieIdFromTitle = (title) => {
    const movie = filmsData.find((film) => film.title === title);
    return movie ? movie.episode_id : "";
  };

  const filteredChars = selectedMovie
    ? swData.filter((character) =>
        character.filmsUrl.some((filmUrl) =>
          filmUrl.includes(movieIdFromTitle(selectedMovie.title))
        )
      )
    : swData;

  return (
    <Router>
      <div id="top" className="home-page">
        <h1 className="title">STAR WARS PEDIA</h1>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            Loading ...
            <div className="center">
              <span className="loadings"></span>
              <span className="loadings"></span>
            </div>
          </div>
        ) : (
          <>
            <Header
              film={handleFilmShow}
              chars={handleToggleChars}
              stars={handleToggleStarships}
            />
            {showFilm && (
              <AllFilms onSelect={handleMovieClick} films={filmsData} />
            )}
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
              <span id="details"></span>
              <Routing starship={selectedStarship} swData={swData} />
              {showChars ? (
                <span id="characters">
                  {selectedMovie && (
                    <p>
                      Characters Starred in :{" "}
                      <span className="selected-movie-span">
                        {selectedMovie.title}
                      </span>
                    </p>
                  )}
                  <AllChars
                    onSelect={handleCharacterSelect}
                    indexSet={setCurrentIndex}
                    swData={filteredChars}
                  />
                </span>
              ) : (
                <span id="starships">
                  <AllStarships
                    onSelect={handleStarshipSelect}
                    starships={starshipsData}
                  />
                </span>
              )}
            </Suspense>
            <div className="pages-btn">
              {pages.map((item, index) => (
                <button
                  className={index === currentPage - 1 && "active"}
                  key={item}
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}
        <video
          id="bgvideo"
          src={showChars ? bgVid : lucreHulk}
          autoPlay
          loop
          muted
        />
      </div>
      {scrollUp && (
        <a className="scrollup" href="#top">
          UP
        </a>
      )}
    </Router>
  );
}

export default App;
