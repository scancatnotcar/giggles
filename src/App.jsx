// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './HomePage';
import Polaroid from './Polaroid';
import Memories from './Memories';
import Features from './Features';
import AboutUs from './AboutUs';
import Flower from './Flower';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ScrapBook from './ScrapBook';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d63384',
    },
    secondary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/polaroid" element={<Polaroid />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/features" element={<Features />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/flower" element={<Flower />} />
            {/* Shareable bouquet route */}
            <Route path="/flower/share/:shareId" element={<Flower />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/scrapbook" element={<ScrapBook />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;