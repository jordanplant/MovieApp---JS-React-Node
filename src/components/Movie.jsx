import React, { useEffect, useState } from "react";
import Styles from "./Movie.module.css"; // Import your CSS module styles
import MovieDetailsModal from "./MovieDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Movie({ apiUrl, region }) {
  console.log("Region prop in Movie:", region);
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [updateTrigger, setUpdateTrigger] = useState(false);

  // Fetch movies whenever apiUrl or region changes
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setMovieList(json.results);
        setUpdateTrigger((prev) => !prev); // Trigger a rerender
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getMovies();
  }, [apiUrl, region]);

  // Handle clicking on a movie poster
  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  console.log(movieList);
  return (
    <div className={Styles.movieContainer}>
      {movieList.map((movie) => (
        <div
          key={movie.id}
          className={Styles.moviePosterContainer}
          onClick={() => handlePosterClick(movie)}
        >
          {movie.poster_path ? (
            <img
              className={Styles.movieImage}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            // Display a placeholder image if poster_path is null
            <img
              className={Styles.movieImage}
              src="src/assets/Poster_Placeholder.png"
              alt={movie.title}
            />
          )}
          <div className={Styles.movieTitleContainer}>
            <p
              className={`${Styles.movieTitle} ${
                movie.original_title.length > 40 ? Styles.truncated : ""
              }`}
            >
              {movie.original_title}
            </p>
          </div>
        </div>
      ))}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          region={region} // Pass 'region' to MovieDetailsModal
        >
          {/* Use the close icon */}
          <FontAwesomeIcon
            icon={faTimes}
            size="2x"
            onClick={handleCloseModal}
          />
        </MovieDetailsModal>
      )}
    </div>
  );
}

export default Movie;
