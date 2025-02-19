import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/authUtil";

const Logo = styled("img")({
  height: 40,
  width: "auto",
  marginRight: "auto",
});

const logoImage = "src/assets/images/WorldReaderLogo.png";
const userProfilePicture = "/path/to/profile/picture.jpg";

function logout() {
  localStorage.removeItem("token");
}

function TopBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dark, setDark] = useState(false);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleClickSettings = () => {
    handleClose();
    navigate("/profile");
  };
  const handleLogout = () => {
    logout();
    handleClose();
  };

  const toggleDarkMode = () => {
    setDark(!dark);
    if (!dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Logo
          onClick={() => navigate("/home")}
          src={logoImage}
          alt="WorldReader Logo"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexGrow: 1,
          }}
        >
          <Button onClick={() => navigate("/map")} color="inherit">
            <h1 className="font-fondamento font-bold text-2xl">Map</h1>
          </Button>
          <Button color="inherit">
            <h1 className="font-fondamento font-bold text-2xl">Library</h1>
          </Button>
          <Button color="inherit">
            <h1 className="font-fondamento font-bold text-2xl">Store</h1>
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          {/* Theme Toggle Button added at line 84 */}
          <IconButton onClick={toggleDarkMode} color="inherit">
            {dark ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar alt="User Profile" src={userProfilePicture} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isTokenValid() ? (
              <MenuItem onClick={handleClickSettings}>Settings</MenuItem>
            ) : null}
            {isTokenValid() ? (
              <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                Log Out
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/login");
                }}
              >
                Log In
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
