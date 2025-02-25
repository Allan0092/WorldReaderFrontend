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
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../App"; // Adjust path as needed
import { getCurrentToken } from "../../../utils/authUtil"; // Only need token for API calls

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
  const { user, logout } = useAuth(); // Use AuthContext for user data and logout

  // Populate form with user data from AuthContext
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        country: user.country || "",
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
        logout(); // Use AuthContext logout instead of manual token removal
        window.location.href = "/login"; // Redirect to login
      }
    } catch (e) {
      console.error("Delete error:", e);
      toast.error(e.response?.data || "Could not delete account");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={6}
        sx={{
          bgcolor: "rgba(255, 245, 235, 0.95)", // Parchment-like background
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(139, 69, 19, 0.1)",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          align="center"
          sx={{ fontFamily: "Georgia, serif", color: "#8B4513", mb: 3 }}
        >
          Personal Info
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "#A0522D", mb: 4 }}
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
              backgroundColor: "#FFF8E7",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#D2B48C" },
                "&:hover fieldset": { borderColor: "#A0522D" },
                "&.Mui-focused fieldset": { borderColor: "#8B4513" },
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
              disabled={isLoading || deleteLoading}
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
            id="country"
            name="country"
            label="Country"
            value={formData.country}
            onChange={handleChange}
            disabled={isLoading || deleteLoading}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={resetPassword}
                onChange={(e) => setResetPassword(e.target.checked)}
                disabled={isLoading || deleteLoading}
                sx={{
                  color: "#D2B48C",
                  "&.Mui-checked": { color: "#8B4513" },
                }}
              />
            }
            label="Reset Password (email will be sent)"
            sx={{ mb: 3, color: "#666" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading || deleteLoading}
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
              "&:hover": { bgcolor: "#FFEBEE", borderColor: "#C62828" },
              "&:disabled": { borderColor: "#E57373", color: "#E57373" },
            }}
          >
            {deleteLoading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 2, color: "#E57373" }} />
                Deleting...
              </>
            ) : (
              "Delete Account"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProfilePage;
