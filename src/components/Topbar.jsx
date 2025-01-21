import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/authUtil";

// Styled component for the logo (placeholder for your actual logo)
const Logo = styled("img")({
  height: 40,
  width: "auto",
  marginRight: "auto",
});

// Assuming you have these images in your project
const logoImage = "src/assets/images/WorldReaderLogo.png";
const userProfilePicture = "/path/to/profile/picture.jpg";

function logout() {
  localStorage.removeItem("token");
}

function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSettings = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Logo
            onClick={() => navigate("/home")}
            src={logoImage}
            alt="WorldReader Logo"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Button onClick={() => navigate("/map")} color="inherit">
              Map
            </Button>
            <Button color="inherit">Library</Button>
            <Button color="inherit">Store</Button>
          </Box>
          <Box sx={{ ml: 2 }}>
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
                vertical: "top",
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
              <MenuItem onClick={handleClickSettings}>Settings</MenuItem>
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
                  sx={{ backgroundColor: "lightblue", color: "blue" }}
                >
                  Log In
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default TopBar;
