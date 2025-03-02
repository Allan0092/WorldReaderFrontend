import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MapIcon from "@mui/icons-material/Map";
import StoreIcon from "@mui/icons-material/Store";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../../App";

const Logo = styled("img")({
  height: 48,
  width: "auto",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const logoImage = "src/assets/images/WorldReaderLogo.png";
const userProfilePicture = "/path/to/profile/picture.jpg";

// function logout() {
//   localStorage.removeItem("token");
// }

function TopBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClickSettings = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#8B4513", // SaddleBrown for a rich, bookish feel
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        {/* Logo */}
        <Logo
          onClick={() => navigate("/home")}
          src={logoImage}
          alt="WorldReader Logo"
        />

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Button
            color="inherit"
            startIcon={<MapIcon />}
            onClick={() => navigate("/map")}
            sx={{
              textTransform: "none",
              fontFamily: "Georgia, serif",
              fontSize: "1.1rem",
              "&:hover": { bgcolor: "#A0522D" },
            }}
          >
            Map
          </Button>
          <Button
            color="inherit"
            startIcon={<LibraryBooksIcon />}
            onClick={() => navigate("/library")}
            sx={{
              textTransform: "none",
              fontFamily: "Georgia, serif",
              fontSize: "1.1rem",
              "&:hover": { bgcolor: "#A0522D" },
            }}
          >
            Library
          </Button>
          <Button
            color="inherit"
            startIcon={<StoreIcon />}
            onClick={() => navigate("/store")}
            sx={{
              textTransform: "none",
              fontFamily: "Georgia, serif",
              fontSize: "1.1rem",
              "&:hover": { bgcolor: "#A0522D" },
            }}
          >
            Store
          </Button>
        </Box>

        {/* User Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Dark Mode Toggle */}
          <Tooltip
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {/* User Menu */}
          <Tooltip title="Account">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt="User Profile"
                src={userProfilePicture}
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: { bgcolor: "#FFF8E7", color: "#8B4513" }, // Parchment-like menu
            }}
          >
            {isAuthenticated ? (
              [
                <MenuItem key="profile" onClick={handleClickSettings}>
                  <AccountCircleIcon sx={{ mr: 1 }} /> Profile
                </MenuItem>,
                <MenuItem
                  key="logout"
                  onClick={handleLogout}
                  sx={{ color: "#A0522D" }}
                >
                  <LogoutIcon sx={{ mr: 1 }} /> Log Out
                </MenuItem>,
              ]
            ) : (
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/login");
                }}
              >
                <LoginIcon sx={{ mr: 1 }} /> Log In
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
