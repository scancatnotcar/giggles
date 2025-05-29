import React from "react";
import Navbar from "./navbar";
import {
  Box,
  Typography,
  Container,
  Paper,
  keyframes,
} from "@mui/material";

const pulse = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const colors = {
  background:
    "linear-gradient(270deg, #FFF0F5, #FFE4E1, #FFF0F5, #FFE4E1)", // subtle pink gradient
  cardBg: "rgba(255, 255, 255, 0.85)",
  border: "#FFB6C1",
  darkText: "#5D3A3A",
  primary: "#FF8DAA",
  accent: "#FFD1DC",
  shadow: "rgba(255, 182, 193, 0.35)",
};

const Blob1 = () => (
  <svg
    width="220"
    height="220"
    viewBox="0 0 220 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      top: 40,
      left: 20,
      opacity: 0.15,
      filter: "drop-shadow(0 0 15px #FF8DAA)",
      zIndex: 0,
      pointerEvents: "none",
      userSelect: "none",
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M133.31 3.365c37.54 11.7 54.39 55.65 40.14 91.26-13.89 34.8-56.52 57.01-91.22 61.75-38.46 5.31-74.41-25.92-79.12-59.25-4.58-31.62 21.52-76.06 55.82-88.22 30.62-10.34 56.54-7.82 74.38-5.54z"
      fill="#FF8DAA"
    />
  </svg>
);

const Blob2 = () => (
  <svg
    width="160"
    height="160"
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      bottom: 60,
      right: 30,
      opacity: 0.12,
      filter: "drop-shadow(0 0 10px #FFD1DC)",
      zIndex: 0,
      pointerEvents: "none",
      userSelect: "none",
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M117.66 9.366c25.48 6.9 36.94 32.83 27.25 53.79-9.42 21.13-38.28 34.64-61.72 37.54-26.04 3.57-50.45-17.38-53.67-39.74-3.1-21.2 14.54-50.99 37.71-59.08 20.7-7 38.23-5.32 50.43-3.51z"
      fill="#FFD1DC"
    />
  </svg>
);

const Sparkle = ({ x, y, size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      top: y,
      left: x,
      opacity: 0.18,
      filter: "drop-shadow(0 0 4px #FF8DAA)",
      zIndex: 0,
      pointerEvents: "none",
      userSelect: "none",
    }}
  >
    <path
      d="M10 0L12.12 6.9L19.51 7.45L13.81 11.8L15.67 18.99L10 14.97L4.33 18.99L6.19 11.8L.49 7.45L7.88 6.9L10 0Z"
      fill="#FF8DAA"
    />
  </svg>
);

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          px: { xs: 2, md: 6 },
          py: { xs: 6, md: 10 },
          fontFamily: "'Poppins', sans-serif",
          background: colors.background,
          backgroundSize: "400% 400%",
          animation: `${pulse} 15s ease infinite`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 4,
          overflow: "hidden",
        }}
      >
        {/* Decorative Blobs */}
        <Blob1 />
        <Blob2 />
        <Sparkle x={100} y={200} size={18} />
        <Sparkle x={300} y={100} size={12} />
        <Sparkle x={250} y={320} size={20} />

        {/* Header */}
        <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 10 }}>
          <Typography
            variant="h2"
            sx={{
              color: colors.darkText,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textShadow: `1px 1px 4px ${colors.shadow}`,
              mb: 1,
              textDecoration: "none",
            }}
          >
            About{" "}
            <span
              style={{
                color: colors.primary,
                textDecoration: "none",
              }}
            >
              Us
            </span>{" "}
            🎀
          </Typography>
          
          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              color: colors.darkText,
              fontWeight: 500,
              fontSize: "1.15rem",
              fontStyle: "italic",
              opacity: 0.85,
            }}
          >
            Where creativity, joy, and memories bloom 🌸
          </Typography>
        </Container>

        {/* Intro Card */}
        <Container maxWidth="sm" sx={{ width: "100%", position: "relative", zIndex: 10 }}>
          <Paper
            elevation={10}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 5,
              backdropFilter: "blur(12px)",
              backgroundColor: colors.cardBg,
              border: `3px dashed ${colors.border}`,
              textAlign: "center",
              boxShadow: `0 12px 32px ${colors.shadow}`,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: `0 20px 48px ${colors.primary}`,
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: colors.darkText,
                fontSize: "1.2rem",
                lineHeight: 1.9,
                fontWeight: 400,
              }}
            >
              Welcome to <strong>Giggles</strong> — where memories turn magical! 🌷📸
              <br />
              <br />
              At Giggles, we believe every picture tells a story. We help you turn those
              stories into beautiful creations — like polaroid prints, vibrant collages, or
              heartwarming memory bouquets.
              <br />
              <br />
              Celebrate your moments, gift a smile, or simply relive the magic — one giggle
              at a time.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AboutUs;
