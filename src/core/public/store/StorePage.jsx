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
import { toast } from "react-toastify";
import { useAuth } from "../../../App";
import { getCurrentUserId } from "../../../utils/authUtil";
import { useAddToLibrary } from "../../private/query";
import { useGetAllBooksPublic } from "../query";

const StorePage = () => {
  const { data: books = [], isLoading, error } = useGetAllBooksPublic();
  const { isAuthenticated, user } = useAuth();
  const { mutate: addToLibrary, isLoading: addLoading } = useAddToLibrary();

  const handleAddToLibrary = (bookId) => {
    if (!isAuthenticated) {
      toast.info("Please log in to add books to your library");
      return;
    }

    const userId = user ? user.id : getCurrentUserId();
    addToLibrary(
      { userId, bookId },
      {
        onSuccess: () => toast.success("Book added to library!"),
        onError: (error) =>
          toast.error(error.response?.data?.message || "Failed to add book"),
      }
    );
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "Georgia, serif", color: "#8B4513" }}
        >
          Book Store
        </Typography>
        <Box>Loading books...</Box>
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
          Book Store
        </Typography>
        <Box>
          Unable to load books at this time. Please try again later. (
          {error.message})
        </Box>
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
        Book Store
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
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
                <Typography variant="body2" color="textSecondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {book.verifiedStatus ? "Verified" : "Pending"}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    mt: 1,
                    bgcolor: "#8B4513",
                    "&:hover": { bgcolor: "#A0522D" },
                  }}
                  onClick={() => handleAddToLibrary(book._id)}
                  disabled={addLoading}
                >
                  {addLoading ? "Adding..." : "Add to Library"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StorePage;
