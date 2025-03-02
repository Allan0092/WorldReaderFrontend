import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useTheme } from "../../../App";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError(false);
    setPasswordError(false);

    try {
      await login(email, password);
      toast.success("Welcome to WorldReader!");
      navigate("/library");
    } catch (error) {
      const errorMsg =
        typeof error === "string" ? error : "Login failed. Please try again.";
      toast.error(errorMsg);
      setEmailError(true);
      setPasswordError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setEmailError(false);
    setPasswordError(false);
  }, [email, password]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: darkMode
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('src/assets/images/loginSignupBg.png')`
          : `url('src/assets/images/loginSignupBg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            bgcolor: darkMode
              ? "rgba(44, 54, 55, 0.9)"
              : "rgba(255, 245, 235, 0.9)",
            p: 4,
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <img
              src="src/assets/images/WorldReaderLogo.png"
              alt="WorldReader Logo"
              style={{
                width: 120,
                height: 120,
                filter: darkMode ? "brightness(1.2)" : "none",
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontFamily: "Georgia, serif",
              color: darkMode ? "#D4A017" : "#8B4513",
              mb: 2,
            }}
          >
            WorldReader
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: darkMode ? "#A67C00" : "#A0522D",
              mb: 4,
            }}
          >
            Log in to explore stories from around the globe
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ spaceY: 3 }}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              error={emailError}
              helperText={emailError ? "Please check your email" : ""}
              autoComplete="email"
              required
              sx={{
                mb: 3,
                backgroundColor: darkMode ? "#2E2E2E" : "#FFF8E7",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "#A67C00" : "#D2B48C",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "#D4A017" : "#A0522D",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: darkMode ? "#D4A017" : "#8B4513",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: darkMode ? "#E0E0E0" : "#8B4513",
                },
                "& .MuiInputBase-input": {
                  color: darkMode ? "#E0E0E0" : "#5D4037",
                },
                "& .MuiFormHelperText-root": {
                  color: darkMode ? "#E0E0E0" : "#A0522D",
                },
              }}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              error={passwordError}
              helperText={passwordError ? "Please check your password" : ""}
              autoComplete="current-password"
              required
              sx={{
                mb: 3,
                backgroundColor: darkMode ? "#2E2E2E" : "#FFF8E7",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "#A67C00" : "#D2B48C",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "#D4A017" : "#A0522D",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: darkMode ? "#D4A017" : "#8B4513",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: darkMode ? "#E0E0E0" : "#8B4513",
                },
                "& .MuiInputBase-input": {
                  color: darkMode ? "#E0E0E0" : "#5D4037",
                },
                "& .MuiFormHelperText-root": {
                  color: darkMode ? "#E0E0E0" : "#A0522D",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={isLoading}
                      sx={{ color: darkMode ? "#E0E0E0" : "#8B4513" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.5,
                bgcolor: darkMode ? "#D4A017" : "#8B4513",
                color: "white",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(139, 69, 19, 0.3)",
                "&:hover": { bgcolor: darkMode ? "#A67C00" : "#A0522D" },
                "&:disabled": { bgcolor: darkMode ? "#5D4037" : "#D2B48C" },
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 2, color: "white" }} />
                  Logging in...
                </>
              ) : (
                "Enter the Library"
              )}
            </Button>
          </Box>
        </Paper>

        {/* Footer */}
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            bgcolor: darkMode ? "#2E2E2E" : "white",
            p: 3,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: darkMode ? "#E0E0E0" : "#666" }}
          >
            Log in with
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, my: 2 }}
          >
            <IconButton href="#" sx={{ p: 0 }}>
              <img
                src="src/assets/images/flat-color-icons_google.png"
                alt="Google"
                style={{ width: 32, height: 32 }}
              />
            </IconButton>
            <IconButton href="#" sx={{ p: 0 }}>
              <img
                src="src/assets/images/logos_facebook.png"
                alt="Facebook"
                style={{ width: 32, height: 32 }}
              />
            </IconButton>
            <IconButton href="#" sx={{ p: 0 }}>
              <img
                src="src/assets/images/ant-design_github-filled.png"
                alt="GitHub"
                style={{
                  width: 32,
                  height: 32,
                  filter: darkMode ? "brightness(1.2)" : "none",
                }}
              />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: darkMode ? "#E0E0E0" : "#666" }}
          >
            Not registered?{" "}
            <Box
              component="a"
              href="/register"
              sx={{
                color: darkMode ? "#D4A017" : "#8B4513",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign up
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
