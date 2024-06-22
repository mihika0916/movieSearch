import React, { useState } from "react";
import MovieInfoCard from "./MovieInfoCard";

const MovieCard = ({ sampleMovie }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    console.log("clicked");
    setShowInfo(!showInfo);
  };

  return (
    <div className="movie">
      <div>
        <bold>
          <p> {sampleMovie.Year}</p>
        </bold>

        <p>---------------------------------</p>

        <p> {sampleMovie.Plot} </p>
      </div>

      <div>
        <img
          src={
            sampleMovie.Poster !== "N/A"
              ? sampleMovie.Poster
              : "https://via.placeholder.com/400"
          }
          alt={sampleMovie.Title}
        ></img>
      </div>

      <div>
        <span>{sampleMovie.Type}</span>
        <h3>{sampleMovie.Title}</h3>
      </div>

      {showInfo && <MovieInfoCard movie={sampleMovie} />}
    </div>
  );
};

export default MovieCard;
