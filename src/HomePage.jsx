import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img12 from './images/12.jpg';
import img13 from './images/13.jpg';
import img14 from './images/14.jpg';
import img15 from './images/15.jpg';

const colors = {
  beigeBackground: '#fdf7f1',
  pastelPink: '#f3a6b1',
  subtlePastelPurple: '#f4f0fa',
  semiDarkPink: '#c48b9f',
  deepBeige: '#a8907a',
  white: '#ffffff',
};

const FloatingHearts = () => {
  const hearts = Array.from({ length: 5 }).map((_, i) => (
    <Box
      key={i}
      component="span"
      sx={{
        position: 'absolute',
        bottom: 10,
        left: 20 + i * 30,
        width: 16 + (i % 2) * 4,
        height: 16 + (i % 2) * 4,
        backgroundColor: colors.pastelPink,
        clipPath:
          'polygon(50% 0%, 61% 10%, 68% 18%, 70% 27%, 66% 33%, 50% 50%, 34% 33%, 30% 27%, 32% 18%, 39% 10%)',
        opacity: 0,
        animation: `floatUp 3.5s ease-in-out ${i * 0.5}s infinite`,
        filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.2))',
      }}
    />
  ));
  return <>{hearts}</>;
};

const BowIcon = () => (
  <Box
    component="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill={colors.pastelPink}
    sx={{
      position: 'absolute',
      top: 8,
      left: 8,
      width: 28,
      height: 28,
      animation: 'flutter 2.5s ease-in-out infinite',
      filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.2))',
      pointerEvents: 'none',
    }}
  >
    <path d="M14 20c-6 0-10 4-10 10 0 6 4 10 10 10 3 0 6-2 7-5-2-1-4-4-4-7 0-4 3-8 7-8l-3-4c-2 0-5 0-7 4z" />
    <path d="M50 20c6 0 10 4 10 10 0 6-4 10-10 10-3 0-6-2-7-5 2-1 4-4 4-7 0-4-3-8-7-8l3-4c2 0 5 0 7 4z" />
    <circle cx="32" cy="32" r="6" />
  </Box>
);

const HomePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  const allImages = [img1, img2, img3, img12, img13, img14, img15];

  return (
    <>
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateY(-20px) scale(1.1);
              opacity: 0.7;
            }
            100% {
              transform: translateY(-40px) scale(1);
              opacity: 0;
            }
          }

          @keyframes flutter {
            0%, 100% {
              transform: rotate(0deg);
            }
            50% {
              transform: rotate(6deg);
            }
          }

          body {
            margin: 0;
            font-family: 'Raleway', cursive;
          }
        `}
      </style>

      <Navbar />

      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #fef9f6, #f3e5f5)',
          fontFamily: "'Raleway', sans-serif",
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            my: 8,
            bgcolor: colors.white,
            px: 6,
            py: 5,
            borderRadius: 4,
            boxShadow: 6,
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          <Button
            variant="contained"
            onClick={handleClick}
            aria-label="Open Giggles menu"
            sx={{
              fontSize: '2.7rem',
              fontWeight: 'bold',
              fontFamily: 'Raleway',
              color: colors.white,
              backgroundColor: colors.pastelPink,
              '&:hover': { backgroundColor: colors.semiDarkPink },
              px: 5,
              py: 2,
              borderRadius: 3,
              textTransform: 'none',
            }}
          >
            Giggles
            <Box
              component="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={colors.white}
              sx={{ width: 24, height: 24, ml: 2, transform: 'rotate(-10deg)' }}
            >
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <rect x="10" y="6" width="4" height="8" rx="1" ry="1" />
              <circle cx="12" cy="16" r="2" />
            </Box>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
            MenuListProps={{ 'aria-labelledby': 'giggles-button' }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                mt: 1.5,
                minWidth: 220,
                backgroundColor: '#fff0f5',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                py: 1,
              },
            }}
          >
            {[
              { label: 'Polaroid Creator', path: '/polaroid' },
              { label: 'Memory Bouquet', path: '/flower' },
              { label: 'Scrapbook', path: '/scrapbook' },
            ].map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleClose(item.path)}
                sx={{
                  fontFamily: 'Raleway',
                  fontSize: '1rem',
                  color: colors.deepBeige,
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: colors.subtlePastelPurple,
                    color: colors.semiDarkPink,
                    fontWeight: 'bold',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          <Typography
            variant="h6"
            sx={{
              color: colors.deepBeige,
              mt: 2,
              fontStyle: 'italic',
            }}
          >
            Snap. Print. Cherish the moment.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 5,
            px: 2,
            mb: 10,
          }}
        >
          {allImages.map((img, idx) => (
            <Box
              key={idx}
              sx={{
                position: 'relative',
                width: 220,
                height: 260,
                background: 'linear-gradient(135deg, #fff0f5 0%, #fceff9 100%)',
                borderRadius: 3,
                boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `rotate(${Math.random() * 10 - 5}deg)`,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'rotate(0deg) scale(1.06)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.25)',
                },
                overflow: 'hidden', // keep hearts inside box
              }}
            >
              <FloatingHearts />
              <BowIcon />
              <Box
                component="img"
                src={img}
                alt={`Memory ${idx + 1}`}
                sx={{
                  width: '100%',
                  height: 170,
                  objectFit: 'cover',
                  filter: 'contrast(1.1) saturate(1.1)',
                  borderRadius: 2,
                  mb: 1,
                  userSelect: 'none',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontSize: 15,
                  color: colors.deepBeige,
                  fontStyle: 'italic',
                }}
              >
                Memory #{idx + 1}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          component="footer"
          sx={{
            bgcolor: colors.semiDarkPink,
            color: colors.white,
            py: 5,
            textAlign: 'center',
            fontSize: 14,
            px: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: 300 }}>
            &copy; {new Date().getFullYear()} Moments. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
