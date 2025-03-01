import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../App"; // Adjust path
import { useGetUserLibrary } from "../../private/query";

const LibraryPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const userId = user ? user._id : null;
  const {
    data: libraryBooks = [],
    isLoading,
    error,
  } = useGetUserLibrary(userId);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "Georgia, serif", color: "#8B4513" }}
        >
          My Library
        </Typography>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" sx={{ color: "#8B4513", mb: 2 }}>
            You need to log in to view your library.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#8B4513",
              color: "white",
              "&:hover": { bgcolor: "#A0522D" },
            }}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </Box>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "Georgia, serif", color: "#8B4513" }}
        >
          My Library
        </Typography>
        <Box>Loading your library...</Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "Georgia, serif", color: "#8B4513" }}
        >
          My Library
        </Typography>
        <Box>Error loading library: {error.message}</Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "Georgia, serif", color: "#8B4513" }}
      >
        My Library
      </Typography>
      {libraryBooks.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" sx={{ color: "#8B4513" }}>
            Your library is empty. Add books from the store to start reading!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {libraryBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    book.coverURL
                      ? `http://localhost:5000/${book.coverURL}`
                      : "/placeholder-cover.jpg"
                  }
                  alt={book.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#8B4513" }}>
                    {book.title}
                  </Typography>
                  {/* Add more details or content link later */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default LibraryPage;
