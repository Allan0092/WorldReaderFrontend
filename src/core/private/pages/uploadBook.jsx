import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function UploadBookPage() {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [contentType, setContentType] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !contentType || !file) {
      toast.error(
        "Please fill all required fields (title, content type, file)."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("isbn", isbn);
      formData.append("contentType", contentType);
      formData.append("file", file);

      // Adjust the endpoint to match your server
      const response = await axios.post(
        "http://localhost:5000/api/books/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Book uploaded successfully!");
        setTitle("");
        setIsbn("");
        setContentType("");
        setFile(null);
      } else {
        toast.error("Book upload failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upload Book
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="ISBN"
          variant="outlined"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          fullWidth
        />
        <FormControl required variant="outlined" fullWidth>
          <InputLabel id="content-type-label">Content Type</InputLabel>
          <Select
            labelId="content-type-label"
            label="Content Type *"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <MenuItem value="PDF">PDF</MenuItem>
            <MenuItem value="ePub">ePub</MenuItem>
          </Select>
        </FormControl>
        <FormControl required>
          <FormLabel>File Upload</FormLabel>
          <Button variant="contained" component="label">
            Choose File
            <input
              type="file"
              accept=".pdf, .epub"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {file.name}
            </Typography>
          )}
        </FormControl>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button type="submit" variant="contained">
              Upload
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
