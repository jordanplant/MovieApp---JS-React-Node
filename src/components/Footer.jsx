import React from "react";

const Footer = () => {
  return (
    <div Style="display: flex; flex-direction: row; justify-content: center; align-items:center;">
      <p Style="font-size:12px;">
        Movie data and images courtesy of themoviedb.org{" "}
      </p>
      <a
        href="https://www.themoviedb.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          Style="width: 100px; padding: 0px 10px;"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        />
      </a>
    </div>
  );
};

export default Footer;
