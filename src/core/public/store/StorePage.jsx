import VerifiedIcon from "@mui/icons-material/Verified";
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
import { styled } from "@mui/material/styles";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { useAuth, useTheme } from "../../../App";
import { getCurrentToken } from "../../../utils/authUtil";
import { useAddToLibrary } from "../../private/query";
import { useGetAllBooksPublic } from "../query";

// Styled components
const StoreWrapper = styled(Box)(({ theme, darkMode }) => ({
  minHeight: "100vh",
  background: darkMode
    ? "linear-gradient(180deg, #1C2526 0%, #2E2E2E 100%)"
    : "linear-gradient(180deg, #FFF8E7 0%, #F5F5F5 100%)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

const StoreContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  width: "100%",
  maxWidth: "lg",
  marginLeft: "auto",
  marginRight: "auto",
}));

const StoreCard = styled(Card)(({ theme, darkMode }) => ({
  backgroundColor: darkMode ? "#2E2E2E" : "white",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    boxShadow: darkMode
      ? "0 6px 12px rgba(212, 160, 23, 0.2)"
      : "0 6px 12px rgba(139, 69, 19, 0.2)",
  },
}));

const StorePage = () => {
  const queryClient = useQueryClient();
  const { data: books = [], isLoading, error } = useGetAllBooksPublic();
  const { isAuthenticated, user } = useAuth();
  const { darkMode } = useTheme(); // Access darkMode
  const { mutate: addToLibrary, isLoading: addLoading } = useAddToLibrary();

  const handleAddToLibrary = (bookId) => {
    if (!isAuthenticated) {
      toast.info("Please log in to add books to your library");
      return;
    }

    const token = getCurrentToken();
    if (!token) {
      toast.error("No authentication token found");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = user?.id || payload.id || payload.sub;
    console.log("Adding to library - userId:", userId, "bookId:", bookId);

    if (!userId) {
      toast.error("Unable to determine user ID");
      return;
    }

    addToLibrary(
      { userId, bookId },
      {
        onSuccess: () => {
          toast.success("Book added to library!");
          queryClient.invalidateQueries(["USER_LIBRARY", userId]);
        },
        onError: (error) =>
          toast.error(error.response?.data?.message || "Failed to add book"),
      }
    );
  };

  if (isLoading) {
    return (
      <StoreWrapper darkMode={darkMode}>
        <StoreContainer>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "Georgia, serif",
              color: darkMode ? "#D4A017" : "#8B4513",
            }}
          >
            Book Store
          </Typography>
          <Box sx={{ color: darkMode ? "#E0E0E0" : "#5D4037" }}>
            Loading books...
          </Box>
        </StoreContainer>
      </StoreWrapper>
    );
  }

  if (error) {
    return (
      <StoreWrapper darkMode={darkMode}>
        <StoreContainer>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "Georgia, serif",
              color: darkMode ? "#D4A017" : "#8B4513",
            }}
          >
            Book Store
          </Typography>
          <Box sx={{ color: darkMode ? "#E0E0E0" : "#5D4037" }}>
            Unable to load books at this time. Please try again later. (
            {error.message})
          </Box>
        </StoreContainer>
      </StoreWrapper>
    );
  }

  return (
    <StoreWrapper darkMode={darkMode}>
      <StoreContainer>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Georgia, serif",
            color: darkMode ? "#D4A017" : "#8B4513",
          }}
        >
          Book Store
        </Typography>
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <StoreCard darkMode={darkMode}>
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
                  <Typography
                    variant="h6"
                    sx={{
                      color: darkMode ? "#D4A017" : "#8B4513",
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: darkMode ? "#A67C00" : "textSecondary",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Author: {book.author}{" "}
                    {book.verifiedStatus && (
                      <VerifiedIcon
                        sx={{ color: "#1DA1F2", fontSize: 16, ml: 1 }}
                      />
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: darkMode ? "#A67C00" : "textSecondary" }}
                  >
                    Status: {book.verifiedStatus ? "Verified" : "Pending"}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      mt: 1,
                      bgcolor: darkMode ? "#D4A017" : "#8B4513",
                      color: "white",
                      "&:hover": { bgcolor: darkMode ? "#A67C00" : "#A0522D" },
                      "&:disabled": {
                        bgcolor: darkMode ? "#5D4037" : "#D2B48C",
                      },
                    }}
                    onClick={() => handleAddToLibrary(book._id)}
                    disabled={addLoading}
                  >
                    {addLoading ? "Adding..." : "Add to Library"}
                  </Button>
                </CardContent>
              </StoreCard>
            </Grid>
          ))}
        </Grid>
      </StoreContainer>
    </StoreWrapper>
  );
};

export default StorePage;
