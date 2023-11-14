import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import CountrySelect from "./CountrySelect";

const pages = [];

function ResponsiveAppBar({ region, handleRegionChange }) {
  console.log("ResponsiveAppBar - Received region:", region);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#responsive-app-bar"
            sx={{
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            MOVIE APP
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <CountrySelect
              region={region}
              onRegionChange={handleRegionChange}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
