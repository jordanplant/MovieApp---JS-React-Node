import React from "react";
import Styles from "./CountrySelect.module.css";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

export const countries = {
  AR: "🇦🇷 Argentina",
  AU: "🇦🇺 Australia",
  AT: "🇦🇹 Austria",
  BE: "🇧🇪 Belgium",
  BR: "🇧🇷 Brazil",
  CA: "🇨🇦 Canada",
  CL: "🇨🇱 Chile",
  CN: "🇨🇳 China",
  DK: "🇩🇰 Denmark",
  FI: "🇫🇮 Finland",
  FR: "🇫🇷 France",
  DE: "🇩🇪 Germany",
  GR: "🇬🇷 Greece",
  IN: "🇮🇳 India",
  IE: "🇮🇪 Ireland",
  IT: "🇮🇹 Italy",
  JP: "🇯🇵 Japan",
  MX: "🇲🇽 Mexico",
  NL: "🇳🇱 Netherlands",
  NZ: "🇳🇿 New Zealand",
  PL: "🇵🇱 Poland",
  PT: "🇵🇹 Portugal",
  RU: "🇷🇺 Russia",
  ZA: "🇿🇦 South Africa",
  KR: "🇰🇷 South Korea",
  ES: "🇪🇸 Spain",
  CH: "🇨🇭 Switzerland",
  SE: "🇸🇪 Sweden",
  GB: "🇬🇧 United Kingdom",
  US: "🇺🇸 United States",
  NO: "🇳🇴 Norway",
};

const CountrySelect = ({ region, onRegionChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (regionCode) => {
    if (typeof onRegionChange === "function") {
      onRegionChange(regionCode); // This should update the state in MainApp
    }
    handleCloseUserMenu();
  };

  return (
    <div className={Styles.CountriesList}>
      <Tooltip title="Select Region">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={region}>{countries[region].split(" ")[0]}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleCloseUserMenu}
      >
        {Object.entries(countries).map(([code, name]) => (
          <MenuItem key={code} onClick={() => handleMenuItemClick(code)}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CountrySelect;
