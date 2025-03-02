import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles"; // Add styled
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useTheme } from "../../../App"; // Add useTheme
import { getCurrentToken } from "../../../utils/authUtil";

// Styled components
const UploadWrapper = styled(Box)(({ theme, darkMode }) => ({
  minHeight: "100vh",
  background: darkMode
    ? "linear-gradient(180deg, #1C2526 0%, #2E2E2E 100%)"
    : "linear-gradient(180deg, #FFF8E7 0%, #F5F5F5 100%)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

const UploadContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  width: "100%",
  maxWidth: "sm",
  marginLeft: "auto",
  marginRight: "auto",
}));

const UploadBox = styled(Box)(({ theme, darkMode }) => ({
  backgroundColor: darkMode
    ? "rgba(44, 54, 55, 0.95)"
    : "rgba(255, 245, 235, 0.95)",
  padding: theme.spacing(4),
  borderRadius: 3,
  boxShadow: darkMode
    ? "0 4px 12px rgba(212, 160, 23, 0.1)"
    : "0 4px 12px rgba(139, 69, 19, 0.1)",
}));

const UploadBookPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { darkMode } = useTheme(); // Access darkMode
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    publicationDate: new Date().toISOString().split("T")[0], // Default to today
    contentType: "PDF",
    author: "",
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = getCurrentToken();
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setFormData((prev) => ({ ...prev, author: payload.id || payload.sub }));
    }
  }, []);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a PDF file to upload");
      return;
    }
    if (!formData.title) {
      toast.error("Title is required");
      return;
    }
    if (!formData.author) {
      toast.error("Author could not be determined");
      return;
    }

    setIsLoading(true);
    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("isbn", formData.isbn);
    uploadData.append("publicationDate", formData.publicationDate);
    uploadData.append("contentType", formData.contentType);
    uploadData.append("author", formData.author);
    uploadData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/book/",
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${getCurrentToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload response:", response.data);
      toast.success("Book uploaded successfully!");
      navigate("/profile/user-settings");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload book");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UploadWrapper darkMode={darkMode}>
      <UploadContainer>
        <UploadBox darkMode={darkMode}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontFamily: "Georgia, serif",
              color: darkMode ? "#D4A017" : "#8B4513", // Golden brown vs. saddle brown
              mb: 3,
            }}
          >
            Upload a Book
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isLoading}
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
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              disabled={isLoading}
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
            <TextField
              fullWidth
              label="Publication Date"
              name="publicationDate"
              type="date"
              value={formData.publicationDate}
              onChange={handleChange}
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
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
            <Box sx={{ mb: 3 }}>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isLoading}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  backgroundColor: darkMode ? "#2E2E2E" : "#FFF8E7",
                  color: darkMode ? "#E0E0E0" : "#5D4037",
                  borderRadius: "4px",
                  border: darkMode ? "1px solid #A67C00" : "1px solid #D2B48C",
                }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.5,
                bgcolor: darkMode ? "#D4A017" : "#8B4513", // Golden brown vs. saddle brown
                color: "white",
                "&:hover": { bgcolor: darkMode ? "#A67C00" : "#A0522D" },
                "&:disabled": { bgcolor: darkMode ? "#5D4037" : "#D2B48C" },
              }}
            >
              {isLoading ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Upload Book"
              )}
            </Button>
          </form>
        </UploadBox>
      </UploadContainer>
    </UploadWrapper>
  );
};

export default UploadBookPage;
