import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import ResponsiveAppBar from "./NavbarTwo";
import { countries } from "./CountrySelect"; // Import the countries object from CountrySelect
import "./mainApp.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const API_KEY = "c9aafa75d4bd6f4117f32f28fe0e5c8f";

const MainApp = () => {
  const [region, setRegion] = useState("GB");
  const [apiUrl, setApiUrl] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom"); // Default country name

  const handleRegionChange = (newRegion) => {
    console.log("MainApp - Region changed to:", newRegion);
    setRegion(newRegion);
    // Split the emoji from the country name using a regular expression
    const countryName = countries[newRegion];
    setSelectedCountry(countryName.replace(/[^a-zA-Z\s]/g, ""));
  };

  useEffect(() => {
    const today = new Date();
    const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));

    const newApiUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en&page=1&region=${region}&api_key=${API_KEY}&release_date.gte=${
      oneWeekAgo.toISOString().split("T")[0]
    }&release_date.lte=${new Date().toISOString().split("T")[0]}`;
    setApiUrl(newApiUrl);
  }, [region]); // Re-fetch when region changes

  console.log("MainApp - Region:", region);

  return (
    <>
      <ResponsiveAppBar
        region={region}
        handleRegionChange={handleRegionChange}
      />
      <h2>Now Playing in {selectedCountry}</h2>
      <Movie apiUrl={apiUrl} region={region} />
      {/* Additional components and logic as needed */}
    </>
  );
};

export default MainApp;
