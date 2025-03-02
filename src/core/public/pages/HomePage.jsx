import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MapIcon from "@mui/icons-material/Map";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

// Styled components
const HomeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  background: "linear-gradient(180deg, #FFF8E7 0%, #F5F5F5 100%)",
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  width: "100%",
  maxWidth: "none",
}));

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(6),
  backgroundColor: "#8B4513",
  color: "white",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 16px rgba(139, 69, 19, 0.2)",
  marginBottom: theme.spacing(6),
  marginLeft: 0,
  marginRight: 0,
}));

const HeroButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFF8E7",
  color: "#8B4513",
  "&:hover": {
    backgroundColor: "#F5F5F5",
  },
  padding: theme.spacing(1.5, 4),
  fontSize: "1.2rem",
  fontFamily: "Georgia, serif",
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 6px 12px rgba(139, 69, 19, 0.1)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(139, 69, 19, 0.2)",
  },
  backgroundColor: "#FFF8E7",
  textAlign: "center",
  padding: theme.spacing(2),
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  fontSize: 60,
  color: "#8B4513",
  marginBottom: theme.spacing(2),
}));

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <ContentWrapper>
        {/* Hero Section */}
        <HeroSection>
          <Typography
            variant="h2"
            sx={{ fontFamily: "Georgia, serif", fontWeight: 600, mb: 2 }}
          >
            Welcome to WorldReader
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: "Georgia, serif", mb: 4 }}>
            Discover a world of books, build your library, and explore global
            stories.
          </Typography>
          <HeroButton onClick={() => navigate("/store")}>
            Explore the Store
          </HeroButton>
        </HeroSection>

        {/* Features Section */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Georgia, serif",
            color: "#8B4513",
            textAlign: "center",
            mb: 4,
          }}
        >
          Discover Your Reading Journey
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <FeatureIcon>
                <LibraryBooksIcon fontSize="inherit" />
              </FeatureIcon>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Georgia, serif", color: "#8B4513", mb: 1 }}
              >
                Your Library
              </Typography>
              <Typography variant="body1" sx={{ color: "#5D4037" }}>
                Curate and manage your personal collection of books from
                anywhere.
              </Typography>
              <Button
                variant="text"
                sx={{ color: "#8B4513", mt: 2, fontFamily: "Georgia, serif" }}
                onClick={() => navigate("/library")}
              >
                Go to Library
              </Button>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <FeatureIcon>
                <StoreIcon fontSize="inherit" />
              </FeatureIcon>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Georgia, serif", color: "#8B4513", mb: 1 }}
              >
                Book Store
              </Typography>
              <Typography variant="body1" sx={{ color: "#5D4037" }}>
                Browse and add books from a diverse global catalog.
              </Typography>
              <Button
                variant="text"
                sx={{ color: "#8B4513", mt: 2, fontFamily: "Georgia, serif" }}
                onClick={() => navigate("/store")}
              >
                Visit Store
              </Button>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <FeatureIcon>
                <MapIcon fontSize="inherit" />
              </FeatureIcon>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Georgia, serif", color: "#8B4513", mb: 1 }}
              >
                World Map
              </Typography>
              <Typography variant="body1" sx={{ color: "#5D4037" }}>
                Explore where stories come from with our interactive map.
              </Typography>
              <Button
                variant="text"
                sx={{ color: "#8B4513", mt: 2, fontFamily: "Georgia, serif" }}
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
