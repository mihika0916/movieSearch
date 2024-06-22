import React, { useState } from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} />

      {
        <div className="movie-details">
          <p>Genre: {movie.genre}</p>
          {/* <p>Actors: {movie.actors.join(", ")}</p> */}
          <p>Rating: {movie.rating}</p>
          <p>Release Date: {movie.releaseDate}</p>
          {/* Add more movie details here */}
        </div>
      }
    </div>
  );
};

export default MovieCard;
