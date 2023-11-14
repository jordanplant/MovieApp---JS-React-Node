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
          (r) => r.iso_3166_1 === region // Use the region prop here
        );
        const certificationData =
          releaseInfo?.release_dates.find((d) => d.certification)
            ?.certification || "Not Rated";

        console.log("Certification Data:", certificationData);

        setCertification(certificationData);
      } catch (error) {
        setError("Failed to fetch certification");
        console.error("Error fetching certification:", error);
      } finally {
        setLoading(false);
      }
    };

    console.log("Movie:", movie);
    console.log("Region:", region);
    console.log("API_KEY:", API_KEY);
    console.log("BASE_URL:", BASE_URL);
    console.log("Region Prop:", region);

    fetchCertification();
  }, [movie, region]); // Add region to the dependency array

  const formattedReleaseDate = formatDate(movie.release_date);
  const languageCode = movie.original_language;
  const languageObject = languageNameMap[languageCode];
  const fullLanguageName = languageObject ? languageObject.name : languageCode;

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
              <button className={Styles.MovieButtons}>Show Times</button>
              <button className={Styles.MovieButtons}>Trailer</button>
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
