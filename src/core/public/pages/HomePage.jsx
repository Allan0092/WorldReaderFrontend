import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MapIcon from "@mui/icons-material/Map";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../App"; // Add useTheme

// Styled components
const HomeContainer = styled(Box)(({ theme, darkMode }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  background: darkMode
    ? "linear-gradient(180deg, #1C2526 0%, #2E2E2E 100%)"
    : "linear-gradient(180deg, #FFF8E7 0%, #F5F5F5 100%)",
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  width: "100%",
  maxWidth: "none",
}));

const HeroSection = styled(Box)(({ theme, darkMode }) => ({
  textAlign: "center",
  padding: theme.spacing(6),
  backgroundColor: darkMode ? "#D4A017" : "#8B4513", // Golden brown vs. saddle brown
  color: "white",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: darkMode
    ? "0 8px 16px rgba(212, 160, 23, 0.2)"
    : "0 8px 16px rgba(139, 69, 19, 0.2)",
  marginBottom: theme.spacing(6),
  marginLeft: 0,
  marginRight: 0,
}));

const HeroButton = styled(Button)(({ theme, darkMode }) => ({
  backgroundColor: darkMode ? "#2E2E2E" : "#FFF8E7",
  color: darkMode ? "#E0E0E0" : "#8B4513",
  "&:hover": {
    backgroundColor: darkMode ? "#5D4037" : "#F5F5F5",
  },
  padding: theme.spacing(1.5, 4),
  fontSize: "1.2rem",
  fontFamily: "Georgia, serif",
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
}));

const FeatureCard = styled(Card)(({ theme, darkMode }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: darkMode
    ? "0 6px 12px rgba(212, 160, 23, 0.1)"
    : "0 6px 12px rgba(139, 69, 19, 0.1)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: darkMode
      ? "0 12px 24px rgba(212, 160, 23, 0.2)"
      : "0 12px 24px rgba(139, 69, 19, 0.2)",
  },
  backgroundColor: darkMode ? "#2E2E2E" : "#FFF8E7",
  textAlign: "center",
  padding: theme.spacing(2),
}));

const FeatureIcon = styled(Box)(({ theme, darkMode }) => ({
  fontSize: 60,
  color: darkMode ? "#D4A017" : "#8B4513", // Golden brown vs. saddle brown
  marginBottom: theme.spacing(2),
}));

const HomePage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme(); // Access darkMode

  return (
    <HomeContainer darkMode={darkMode}>
      <ContentWrapper>
        {/* Hero Section */}
        <HeroSection darkMode={darkMode}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Georgia, serif",
              fontWeight: 600,
              mb: 2,
              color: "white",
            }}
          >
            Welcome to WorldReader
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontFamily: "Georgia, serif", mb: 4, color: "white" }}
          >
            Discover a world of books, build your library, and explore global
            stories.
          </Typography>
          <HeroButton darkMode={darkMode} onClick={() => navigate("/store")}>
            Explore the Store
          </HeroButton>
        </HeroSection>

        {/* Features Section */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Georgia, serif",
            color: darkMode ? "#D4A017" : "#8B4513",
            textAlign: "center",
            mb: 4,
          }}
        >
          Discover Your Reading Journey
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FeatureCard darkMode={darkMode}>
              <FeatureIcon darkMode={darkMode}>
                <LibraryBooksIcon fontSize="inherit" />
              </FeatureIcon>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Georgia, serif",
                  color: darkMode ? "#D4A017" : "#8B4513",
                  mb: 1,
                }}
              >
                Your Library
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: darkMode ? "#E0E0E0" : "#5D4037" }}
              >
                Curate and manage your personal collection of books from
                anywhere.
              </Typography>
              <Button
                variant="text"
                sx={{
                  color: darkMode ? "#D4A017" : "#8B4513",
                  mt: 2,
                  fontFamily: "Georgia, serif",
                }}
                onClick={() => navigate("/library")}
              >
                Go to Library
              </Button>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard darkMode={darkMode}>
              <FeatureIcon darkMode={darkMode}>
                <StoreIcon fontSize="inherit" />
              </FeatureIcon>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Georgia, serif",
                  color: darkMode ? "#D4A017" : "#8B4513",
                  mb: 1,
                }}
              >
                Book Store
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: darkMode ? "#E0E0E0" : "#5D4037" }}
              >
                Browse and add books from a diverse global catalog.
              </Typography>
              <Button
                variant="text"
                sx={{
                  color: darkMode ? "#D4A017" : "#8B4513",
                  mt: 2,
                  fontFamily: "Georgia, serif",
                }}
                onClick={() => navigate("/store")}
              >
                Visit Store
              </Button>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard darkMode={darkMode}>
              <FeatureIcon darkMode={darkMode}>
                <MapIcon fontSize="inherit" />
              </FeatureIcon>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Georgia, serif",
                  color: darkMode ? "#D4A017" : "#8B4513",
                  mb: 1,
                }}
              >
                World Map
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: darkMode ? "#E0E0E0" : "#5D4037" }}
              >
                Explore where stories come from with our interactive map.
              </Typography>
              <Button
                variant="text"
                sx={{
                  color: darkMode ? "#D4A017" : "#8B4513",
                  mt: 2,
                  fontFamily: "Georgia, serif",
                }}
                onClick={() => navigate("/map")}
              >
                View Map
              </Button>
            </FeatureCard>
          </Grid>
        </Grid>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default HomePage;
