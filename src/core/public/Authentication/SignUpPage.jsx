import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (!termsAgreed) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/user/", {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Welcome to WorldReader! Please log in.");
        navigate("/login");
      }
    } catch (e) {
      const errorMsg = e.response?.data || "Registration failed.";
      toast.error(errorMsg);
      console.error("Registration error:", e);
    } finally {
      setIsLoading(false);
    }
  };

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
        py: 4,
        position: "relative",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            bgcolor: "rgba(255, 245, 235, 0.9)", // Parchment-like overlay
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
            Join WorldReader
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#A0522D", mb: 4 }}
          >
            Create an account to dive into a world of stories
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ spaceY: 3 }}>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                id="first_name"
                name="first_name"
                label="First Name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={isLoading}
                required
                sx={{
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
                id="last_name"
                name="last_name"
                label="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={isLoading}
                required
                sx={{
                  backgroundColor: "#FFF8E7",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#D2B48C" },
                    "&:hover fieldset": { borderColor: "#A0522D" },
                    "&.Mui-focused fieldset": { borderColor: "#8B4513" },
                  },
                }}
              />
            </Box>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
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
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
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
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  disabled={isLoading}
                  sx={{
                    color: "#D2B48C",
                    "&.Mui-checked": { color: "#8B4513" },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: "#666" }}>
                  I agree to the{" "}
                  <a
                    href="#"
                    style={{ color: "#8B4513", textDecoration: "underline" }}
                  >
                    terms and conditions
                  </a>
                </Typography>
              }
              sx={{ mb: 3 }}
            />
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
                  Signing Up...
                </>
              ) : (
                "Join the Library"
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
            Sign up with
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
            Already registered?{" "}
            <a
              href="/login"
              style={{ color: "#8B4513", textDecoration: "none" }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Log in
            </a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUpPage;
