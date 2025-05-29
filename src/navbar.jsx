import React from 'react';
import { Link } from 'react-router-dom';

// Polaroid pin/tape SVG centered horizontally
const Pin = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="#d36f6f" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ 
      position: 'absolute', 
      top: '-10px', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      zIndex: 5 
    }}
  >
    <circle cx="12" cy="12" r="5" />
  </svg>
);

const navItems = ['home', 'features', 'aboutus', 'sign in', 'sign up'];
const navRoutes = {
  home: '/',
  features: '/features',
  aboutus: '/aboutus',
  'sign in': '/signin',
  'sign up': '/signup'
};

const randomRotation = () => (Math.random() * 10 - 5).toFixed(2);

const Navbar = () => {
  // Use number values for correct SVG coordinate positions
  const pinPositions = [23.5, 36.5, 50, 63, 75.5];

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '120px',
      fontFamily: "'Indie Flower', cursive",
      userSelect: 'none',
      overflow: 'hidden',
      background: 'transparent',
      paddingTop: '20px'
    }}>
      {/* Thread line */}
      <svg 
        width="100%" 
        height="120" 
        viewBox="0 0 100 120" 
        preserveAspectRatio="none"
        style={{ 
          position: 'absolute', 
          top: -20, 
          left: 0, 
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <path 
          d="M 0 45 Q 25 55, 50 50 Q 75 45, 100 50" 
          stroke="#8b7355" 
          strokeWidth="0.3" 
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {pinPositions.map((x, idx) => (
          <g key={idx}>
            <circle 
              cx={x} 
              cy="48" 
              r="1.5" 
              stroke="#8b7355" 
              strokeWidth="0.2" 
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <line 
              x1={x} 
              y1="50" 
              x2={x} 
              y2="65" 
              stroke="#8b7355" 
              strokeWidth="0.2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 50px',
        position: 'relative',
        zIndex: 5,
        marginTop: '25px'
      }}>
        {navItems.map((item, index) => {
          const rotation = randomRotation();
          return (
            <Link
              to={navRoutes[item]}
              key={item}
              style={{
                position: 'relative',
                backgroundColor: 'white',
                boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
                borderRadius: '4px',
                padding: '12px 20px',
                borderBottom: '12px solid #f9d5d3',
                cursor: 'pointer',
                transform: `rotate(${rotation}deg) translateY(8px)`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                userSelect: 'none',
                textTransform: 'capitalize',
                color: '#d36f6f',
                fontWeight: '600',
                fontSize: '16px',
                minWidth: '80px',
                textAlign: 'center',
                textDecoration: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'rotate(0deg) translateY(0) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(211,111,111,0.3)';
                e.currentTarget.style.zIndex = '10';
                e.currentTarget.style.color = '#a23e3e';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = `rotate(${rotation}deg) translateY(8px) scale(1)`;
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
                e.currentTarget.style.zIndex = '5';
                e.currentTarget.style.color = '#d36f6f';
              }}
            >
              <Pin />
              {item}
            </Link>
          );
        })}
      </div>

      {/* Decorative knots at ends */}
      <div style={{
        position: 'absolute',
        left: '10px',
        top: '45px',
        width: '8px',
        height: '8px',
        backgroundColor: '#8b7355',
        borderRadius: '50%',
        zIndex: 2
      }} />
      <div style={{
        position: 'absolute',
        right: '10px',
        top: '50px',
        width: '8px',
        height: '8px',
        backgroundColor: '#8b7355',
        borderRadius: '50%',
        zIndex: 2
      }} />
    </div>
  );
};

export default Navbar;
