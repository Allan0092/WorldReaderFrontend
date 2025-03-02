import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../App"; // Adjust path
import { useGetUserLibrary, useRemoveFromLibrary } from "../../private/query"; // Adjust path

// Styled components
const LibraryWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  background: "linear-gradient(180deg, #FFF8E7 0%, #F5F5F5 100%)",
  width: "100%",
  padding: 0,
  margin: 0,
}));

const LibraryContent = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  width: "100%",
  maxWidth: "1280px", // Equivalent to MUI's 'lg'
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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

const ActionButton = styled(Button)(({ theme }) => ({
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

const RemoveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#D32F2F",
  color: "white",
  "&:hover": {
    backgroundColor: "#B71C1C",
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
  width: "100%",
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  gap: theme.spacing(2),
  flexWrap: "wrap",
  width: "100%",
}));

const LibraryPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = user ? user.id : null;
  const {
    data: libraryBooks = [],
    isLoading,
    error,
  } = useGetUserLibrary(userId);
  const { mutate: removeFromLibrary, isLoading: removeLoading } =
    useRemoveFromLibrary();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");

  const handleRemoveFromLibrary = (bookId) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this book from your library?"
      )
    )
      return;

    removeFromLibrary(
      { userId, bookId },
      {
        onSuccess: () => {
          toast.success("Book removed from library!");
          queryClient.invalidateQueries(["USER_LIBRARY", userId]);
        },
        onError: (error) =>
          toast.error(error.response?.data?.message || "Failed to remove book"),
      }
    );
  };

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...libraryBooks];

    if (searchQuery) {
      result = result.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        result.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      case "date-desc":
        result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      default:
        break;
    }

    return result;
  }, [libraryBooks, searchQuery, sortOption]);

  if (!isAuthenticated) {
    return (
      <LibraryWrapper>
        <LibraryContent>
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
            <ActionButton onClick={() => navigate("/login")}>
              Log In
            </ActionButton>
          </EmptyStatePaper>
        </LibraryContent>
      </LibraryWrapper>
    );
  }

  if (isLoading) {
    return (
      <LibraryWrapper>
        <LibraryContent>
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
        </LibraryContent>
      </LibraryWrapper>
    );
  }

  if (error) {
    return (
      <LibraryWrapper>
        <LibraryContent>
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
        </LibraryContent>
      </LibraryWrapper>
    );
  }

  return (
    <LibraryWrapper>
      <LibraryContent>
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
        <FilterContainer>
          <TextField
            label="Search Books"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, minWidth: 200, backgroundColor: "#FFF8E7" }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: "#8B4513" }}>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              sx={{ backgroundColor: "#FFF8E7", color: "#8B4513" }}
            >
              <MenuItem value="title-asc">Name (A-Z)</MenuItem>
              <MenuItem value="title-desc">Name (Z-A)</MenuItem>
              <MenuItem value="date-asc">Date Added (Oldest)</MenuItem>
              <MenuItem value="date-desc">Date Added (Newest)</MenuItem>
            </Select>
          </FormControl>
        </FilterContainer>
        {filteredAndSortedBooks.length === 0 ? (
          <EmptyStatePaper elevation={3}>
            <LibraryBooksIcon sx={{ fontSize: 60, color: "#8B4513", mb: 2 }} />
            <Typography
              variant="h6"
              sx={{ color: "#8B4513", mb: 2, fontFamily: "Georgia, serif" }}
            >
              {searchQuery
                ? "No matching books found."
                : "Your library is empty."}
            </Typography>
            <Typography variant="body1" sx={{ color: "#5D4037", mb: 2 }}>
              {searchQuery
                ? "Try a different search term."
                : "Add books from the store to start reading!"}
            </Typography>
            {!searchQuery && (
              <ActionButton onClick={() => navigate("/store")}>
                Visit Store
              </ActionButton>
            )}
          </EmptyStatePaper>
        ) : (
          <Grid container spacing={3}>
            {filteredAndSortedBooks.map((book) => (
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
                    sx={{
                      objectFit: "cover",
                      borderBottom: "1px solid #E0E0E0",
                    }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <CardTitle>{book.title}</CardTitle>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                    >
                      <ActionButton
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
                      </ActionButton>
                      <RemoveButton
                        onClick={() => handleRemoveFromLibrary(book._id)}
                        disabled={removeLoading}
                      >
                        {removeLoading ? "Removing..." : "Remove"}
                      </RemoveButton>
                    </Box>
                  </CardContent>
                </LibraryCard>
              </Grid>
            ))}
          </Grid>
        )}
      </LibraryContent>
    </LibraryWrapper>
  );
};

export default LibraryPage;
