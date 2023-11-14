import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Styles from "./MovieDetailsModal.module.css";
import languageNameMap from "language-name-map/map";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function MovieDetailsModal({ movie, onClose, region }) {
  const [certification, setCertification] = useState("Not Rated");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trailerAvailable, setTrailerAvailable] = useState(true); // Track if a trailer is available

  const API_KEY = "c9aafa75d4bd6f4117f32f28fe0e5c8f";
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchCertification = async () => {
      if (!movie || !movie.id || !region) return;

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movie.id}/release_dates`,
          {
            params: { api_key: API_KEY },
          }
        );

        const releaseInfo = response.data.results.find(
          (r) => r.iso_3166_1 === region
        );
        const certificationData =
          releaseInfo?.release_dates.find((d) => d.certification)
            ?.certification || "Not Rated";

        setCertification(certificationData);
      } catch (error) {
        setError("Failed to fetch certification");
        console.error("Error fetching certification:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertification();
  }, [movie, region]);

  const formattedReleaseDate = formatDate(movie.release_date);
  const languageCode = movie.original_language;
  const languageObject = languageNameMap[languageCode];
  const fullLanguageName = languageObject ? languageObject.name : languageCode;

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const fetchTrailers = async () => {
    try {
      // setLoading(true);
      setError("");

      const response = await axios.get(`${BASE_URL}/movie/${movie.id}/videos`, {
        params: { api_key: API_KEY },
      });

      const videoResults = response.data.results;

      if (videoResults.length > 0) {
        const trailerList = videoResults.filter(
          (video) => video.type === "Trailer" || video.type === "Teaser"
        );

        if (trailerList.length > 0) {
          // If trailers are available, open the first one
          const firstTrailer = trailerList[0];
          window.open(
            `https://www.youtube.com/watch?v=${firstTrailer.key}`,
            "_blank"
          );
        } else {
          // No trailers available
          setTrailerAvailable(false);
        }
      } else {
        // No trailers available
        setTrailerAvailable(false);
      }
    } catch (error) {
      setError("Failed to fetch trailers");
      console.error("Error fetching trailers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.modal}>
      <div className={Styles.modalContent}>
        <div className={Styles.CloseButtonContainer}>
          <button className={Styles.CloseButton} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
        </div>

        <h2>{movie.title}</h2>
        <p className={Styles.MovieOverview}>{movie.overview}</p>
        {loading && <p>Loading Movie Information...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div className={Styles.MovieInfo}>
            <table>
              <tbody>
                <tr>
                  <td className={Styles.TableLeft}>Release Date:</td>
                  <td className={Styles.TableRight}>{formattedReleaseDate}</td>
                </tr>
                <tr>
                  <td className={Styles.TableLeft}>Average Rating:</td>
                  <td className={Styles.TableRight}>
                    {(movie.vote_average * 10).toFixed()}%
                  </td>
                </tr>
                <tr>
                  <td className={Styles.TableLeft}>Language:</td>
                  <td className={Styles.TableRight}>{fullLanguageName}</td>
                </tr>
                <tr>
                  <td className={Styles.TableLeft}>Certification:</td>
                  <td className={Styles.TableRight}>{certification}</td>
                </tr>
              </tbody>
            </table>
            <div className={Styles.MovieButtonContainer}>
              <button className={Styles.MovieButtons} onClick={fetchTrailers}>
                Trailer
              </button>
              <p>*opens in external link*</p>
              {/* <button className={Styles.MovieButtons}>Show Times</button> */}
            </div>
            <div className={Styles.TrailerAvailable}>
              {!trailerAvailable && <p>No trailer available</p>}
            </div>
          </div>
        )}
        <img
          className={Styles.modalBackdrop}
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
        />
      </div>
    </div>
  );
}

export default MovieDetailsModal;
