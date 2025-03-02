import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../App"; // Adjust path
import { getCurrentToken } from "../../../utils/authUtil"; // Adjust path

const UploadBookPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    publicationDate: new Date().toISOString().split("T")[0], // Default to today
    contentType: "PDF",
    author: "", // Will be set from token
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Set author from token on mount
  useEffect(() => {
    const token = getCurrentToken();
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setFormData((prev) => ({ ...prev, author: payload.id || payload.sub })); // Adjust based on your token payload
    }
  }, []);

  // Redirect if not authenticated
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
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        sx={{
          bgcolor: "rgba(255, 245, 235, 0.95)",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(139, 69, 19, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontFamily: "Georgia, serif", color: "#8B4513", mb: 3 }}
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
            sx={{ mb: 3, backgroundColor: "#FFF8E7" }}
          />
          <TextField
            fullWidth
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            disabled={isLoading}
            sx={{ mb: 3, backgroundColor: "#FFF8E7" }}
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
            sx={{ mb: 3, backgroundColor: "#FFF8E7" }}
          />
          <Box sx={{ mb: 3 }}>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={isLoading}
              style={{ display: "block", width: "100%" }}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              py: 1.5,
              bgcolor: "#8B4513",
              color: "white",
              "&:hover": { bgcolor: "#A0522D" },
              "&:disabled": { bgcolor: "#D2B48C" },
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Upload Book"
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UploadBookPage;
