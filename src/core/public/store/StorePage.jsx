import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetAllBooksPublic } from "../query";

const StorePage = () => {
  const { data: books = [], isLoading, error } = useGetAllBooksPublic();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading books: {error.message}</Box>;
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
                    : "./src/assets/images/placeholder-cover.jpg"
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StorePage;
