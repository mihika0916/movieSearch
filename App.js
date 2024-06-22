import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=807a4fbf";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [moreMovies, setMoreMovies] = useState(true);

  const searchMovies = async (title, pageNum = 1) => {
    setLoading(true);

    const response = await fetch(`${API_URL}&s=${title}&page=${pageNum}`);
    const data = await response.json();

    console.log(data);

    if (data.Response === "True") {
      const moviesWithDetails = await Promise.all(
        data.Search.map(async (movie) => await fetchMovieDetails(movie))
      );

      console.log(moviesWithDetails);

      //setMovies((prevMovies) => [...prevMovies, ...data.Search]);
      setMovies((prevMovies) => [...prevMovies, ...moviesWithDetails]);
      setPage(pageNum + 1);
      setMoreMovies(true);
    } else {
      setMoreMovies(false);
    }

    setLoading(false);
  };

  const fetchMovieDetails = async (movie) => {
    const response = await fetch(`${API_URL}&i=${movie.imdbID}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    searchMovies("Challengers");
  }, []);

  const handleSearch = () => {
    setMovies([]);
    setPage(1);
    setMoreMovies(true);
    searchMovies(searchTerm);
  };

  // loads more movies when load more button clicked
  const loadMoreMovies = () => {
    if (moreMovies && !loading) {
      searchMovies(searchTerm, page);
    }
  };

  return (
    <div className="app">
      <h1>MovieSearch</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="Search" onClick={handleSearch} />
      </div>
      {movies.length > 0 ? (
        <div>
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} sampleMovie={movie} />
            ))}
          </div>

          <div className="load-button">
            {moreMovies && !loading && (
              <button onClick={loadMoreMovies} className="load-more">
                Load More
              </button>
            )}
            {loading && (
              <div className="loading">
                <h2>Loading...</h2>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
