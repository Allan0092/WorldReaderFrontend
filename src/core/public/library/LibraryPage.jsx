import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../App"; // Adjust path
import { useGetUserLibrary } from "../../private/query"; // Adjust path

// Styled components for a professional look
const LibraryContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  background: "linear-gradient(180deg, #FFF8E7 0%, #F5F5F5 100%)", // Subtle parchment gradient
  minHeight: "100vh",
}));

const LibraryCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 6px 12px rgba(139, 69, 19, 0.1)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(139, 69, 19, 0.2)",
  },
  overflow: "hidden",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Georgia, serif",
  color: "#8B4513",
  fontWeight: 600,
  fontSize: "1.25rem",
  marginBottom: theme.spacing(1),
}));

const ReadButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8B4513",
  color: "white",
  "&:hover": {
    backgroundColor: "#A0522D",
  },
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  textTransform: "none",
  fontFamily: "Georgia, serif",
}));

const EmptyStatePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  backgroundColor: "#FFF8E7",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 8px rgba(139, 69, 19, 0.1)",
  maxWidth: 500,
  margin: "0 auto",
}));

const LibraryPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const userId = user ? user.id : null;
  const {
    data: libraryBooks = [],
    isLoading,
    error,
  } = useGetUserLibrary(userId);

  if (!isAuthenticated) {
    return (
      <LibraryContainer maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Georgia, serif",
            color: "#8B4513",
            textAlign: "center",
          }}
        >
          My Library
        </Typography>
        <EmptyStatePaper elevation={3}>
          <Typography
            variant="h6"
            sx={{ color: "#8B4513", mb: 2, fontFamily: "Georgia, serif" }}
          >
            You need to log in to view your library.
          </Typography>
          <ReadButton onClick={() => navigate("/login")}>Log In</ReadButton>
        </EmptyStatePaper>
      </LibraryContainer>
    );
  }

  if (isLoading) {
    return (
      <LibraryContainer maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Georgia, serif",
            color: "#8B4513",
            textAlign: "center",
          }}
        >
          My Library
        </Typography>
        <Box sx={{ textAlign: "center", color: "#8B4513" }}>
          Loading your library...
        </Box>
      </LibraryContainer>
    );
  }

  if (error) {
    return (
      <LibraryContainer maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Georgia, serif",
            color: "#8B4513",
            textAlign: "center",
          }}
        >
          My Library
        </Typography>
        <Box sx={{ textAlign: "center", color: "#8B4513" }}>
          Error loading library: {error.message}
        </Box>
      </LibraryContainer>
    );
  }

  return (
    <LibraryContainer maxWidth="lg">
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: "Georgia, serif",
          color: "#8B4513",
          textAlign: "center",
        }}
      >
        My Library
      </Typography>
      {libraryBooks.length === 0 ? (
        <EmptyStatePaper elevation={3}>
          <LibraryBooksIcon sx={{ fontSize: 60, color: "#8B4513", mb: 2 }} />
          <Typography
            variant="h6"
            sx={{ color: "#8B4513", mb: 2, fontFamily: "Georgia, serif" }}
          >
            Your library is empty.
          </Typography>
          <Typography variant="body1" sx={{ color: "#5D4037", mb: 2 }}>
            Add books from the store to start reading!
          </Typography>
          <ReadButton onClick={() => navigate("/store")}>
            Visit Store
          </ReadButton>
        </EmptyStatePaper>
      ) : (
        <Grid container spacing={3}>
          {libraryBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <LibraryCard>
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    book.coverURL
                      ? `http://localhost:5000/${book.coverURL.replace(
                          /\\/g,
                          "/"
                        )}`
                      : "/placeholder-cover.jpg"
                  }
                  alt={book.title}
                  sx={{ objectFit: "cover", borderBottom: "1px solid #E0E0E0" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <CardTitle>{book.title}</CardTitle>
                  <ReadButton
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/${book.contentURL.replace(
                          /\\/g,
                          "/"
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    Read Now
                  </ReadButton>
                </CardContent>
              </LibraryCard>
            </Grid>
          ))}
        </Grid>
      )}
    </LibraryContainer>
  );
};

export default LibraryPage;
