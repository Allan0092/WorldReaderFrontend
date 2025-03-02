import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth, useTheme } from "../../../App";
import { getCurrentToken } from "../../../utils/authUtil";

// Styled components
const ProfileWrapper = styled(Box)(({ theme, darkMode }) => ({
  minHeight: "100vh",
  background: darkMode
    ? "linear-gradient(180deg, #1C2526 0%, #2E2E2E 100%)"
    : "linear-gradient(180deg, #FFF8E7 0%, #F5F5F5 100%)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

const ProfileContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  width: "100%",
  maxWidth: "md",
  marginLeft: "auto",
  marginRight: "auto",
}));

const ProfilePaper = styled(Paper)(({ theme, darkMode }) => ({
  backgroundColor: darkMode
    ? "rgba(44, 54, 55, 0.95)"
    : "rgba(255, 245, 235, 0.95)",
  padding: theme.spacing(4),
  borderRadius: 3,
  boxShadow: darkMode
    ? "0 4px 12px rgba(212, 160, 23, 0.1)"
    : "0 4px 12px rgba(139, 69, 19, 0.1)",
}));

function ProfilePage() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    country: "",
  });
  const [resetPassword, setResetPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        country: user.Country || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/update",
        { ...formData, resetPassword },
        {
          headers: {
            Authorization: `Bearer ${getCurrentToken()}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Profile updated successfully");
      }
    } catch (e) {
      console.error("Update error:", e);
      toast.error(e.response?.data || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }
    setDeleteLoading(true);
    try {
      const response = await axios.delete("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${getCurrentToken()}`,
        },
      });
      if (response.status === 200) {
        toast.success("Account deleted successfully");
        logout();
        window.location.href = "/login";
      }
    } catch (e) {
      console.error("Delete error:", e);
      toast.error(e.response?.data || "Could not delete account");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <ProfileWrapper darkMode={darkMode}>
      <ProfileContainer>
        <ProfilePaper elevation={6} darkMode={darkMode}>
          {/* Header */}
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontFamily: "Georgia, serif",
              color: darkMode ? "#D4A017" : "#8B4513",
              mb: 3,
            }}
          >
            Personal Info
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: darkMode ? "#A67C00" : "#A0522D",
              mb: 4,
            }}
          >
            Update your profile details below
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ spaceY: 3 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading || deleteLoading}
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
              }}
            />
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                id="first_name"
                name="first_name"
                label="First Name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={isLoading || deleteLoading}
                required
                sx={{
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
                }}
              />
              <TextField
                fullWidth
                id="last_name"
                name="last_name"
                label="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={isLoading || deleteLoading}
                required
                sx={{
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
                }}
              />
            </Box>
            <TextField
              fullWidth
              id="country"
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleChange}
              disabled={isLoading || deleteLoading}
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
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={resetPassword}
                  onChange={(e) => setResetPassword(e.target.checked)}
                  disabled={isLoading || deleteLoading}
                  sx={{
                    color: darkMode ? "#A67C00" : "#D2B48C",
                    "&.Mui-checked": {
                      color: darkMode ? "#D4A017" : "#8B4513",
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{ color: darkMode ? "#E0E0E0" : "#666" }}
                >
                  Reset Password (email will be sent)
                </Typography>
              }
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading || deleteLoading}
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
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleDelete}
              disabled={isLoading || deleteLoading}
              sx={{
                mt: 2,
                py: 1.5,
                borderColor: "#D32F2F",
                color: "#D32F2F",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: darkMode ? "#3E2723" : "#FFEBEE",
                  borderColor: "#C62828",
                },
                "&:disabled": { borderColor: "#E57373", color: "#E57373" },
              }}
            >
              {deleteLoading ? (
                <>
                  <CircularProgress
                    size={20}
                    sx={{ mr: 2, color: "#E57373" }}
                  />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </Button>
          </Box>
        </ProfilePaper>
      </ProfileContainer>
    </ProfileWrapper>
  );
}

export default ProfilePage;
