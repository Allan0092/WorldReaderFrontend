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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Welcome to WorldReader!");
        navigate("/library"); // Redirect to library instead of "/"
      }
    } catch (e) {
      const errorMsg = e.response?.data || "Login failed. Please try again.";
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
        backgroundImage: `url('src/assets/images/loginSignupBg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            bgcolor: "rgba(255, 245, 235, 0.9)", // Warm parchment-like background
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
              style={{ width: 120, height: 120 }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            align="center"
            sx={{ fontFamily: "Georgia, serif", color: "#8B4513", mb: 2 }}
          >
            WorldReader
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#A0522D", mb: 4 }}
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
                backgroundColor: "#FFF8E7",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#D2B48C" },
                  "&:hover fieldset": { borderColor: "#A0522D" },
                  "&.Mui-focused fieldset": { borderColor: "#8B4513" },
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
                backgroundColor: "#FFF8E7",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#D2B48C" },
                  "&:hover fieldset": { borderColor: "#A0522D" },
                  "&.Mui-focused fieldset": { borderColor: "#8B4513" },
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
                bgcolor: "#8B4513",
                color: "white",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(139, 69, 19, 0.3)",
                "&:hover": { bgcolor: "#A0522D" },
                "&:disabled": { bgcolor: "#D2B48C" },
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
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#666" }}>
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
                style={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Not registered?{" "}
            <a
              href="/register"
              style={{ color: "#8B4513", textDecoration: "none" }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Sign up
            </a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
