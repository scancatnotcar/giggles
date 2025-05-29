import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';

const Pin = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="#d36f6f" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: 6, left: 8, zIndex: 5 }}
  >
    <circle cx="12" cy="12" r="5" />
  </svg>
);

const randomRotation = () => (Math.random() * 10 - 5).toFixed(2);

const featuresData = [
  {
    title: "Polaroid Creator",
    description: "Turn your photos into vintage-style polaroids with customizable captions and frames.",
    imgSrc: img4,
    link: "/polaroid"
  },
  {
    title: "Scrapbook",
    description: "Create beautiful photo collages easily by selecting your favorite pictures and layouts.",
    imgSrc: img5,
    link: "/scrapbook"
  },
  {
    title: "Memory bouquet",
    description: "Organize your favorite memories and moments into stunning bouquets you can share.",
    imgSrc: img6,
    link: "/Flower"
  }
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#fff8f5', minHeight: '100vh', fontFamily: "'Indie Flower', cursive" }}>
      <Navbar />
      <h1 style={{
        textAlign: 'center',
        color: '#a23e3e',
        fontSize: '3rem',
        marginTop: '30px',
        marginBottom: '40px',
        textShadow: '1px 1px 2px #f9d5d3'
      }}>
        Features
      </h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        padding: '0 20px 60px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {featuresData.map(({ title, description, imgSrc, link }, idx) => {
          const rotation = randomRotation();

          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                backgroundColor: 'white',
                width: '300px',
                height: '400px',
                borderRadius: '8px',
                boxShadow: '0 12px 25px rgba(0,0,0,0.12)',
                padding: '15px 15px 40px',
                cursor: 'pointer',
                userSelect: 'none',
                transform: `rotate(${rotation}deg) translateY(6px)`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderBottom: '20px solid #f9d5d3',
                textAlign: 'center',
                fontWeight: '600',
                color: '#7a3b3b',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'rotate(0deg) translateY(0) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 35px rgba(211,111,111,0.4)';
                e.currentTarget.style.zIndex = 10;
                e.currentTarget.style.color = '#a23e3e';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = `rotate(${rotation}deg) translateY(6px) scale(1)`;
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.12)';
                e.currentTarget.style.zIndex = 1;
                e.currentTarget.style.color = '#7a3b3b';
              }}
              onClick={() => navigate(link)}
            >
              <Pin />
              <img 
                src={imgSrc} 
                alt={title} 
                style={{ 
                  width: '100%', 
                  height: '200px', 
                  borderRadius: '6px', 
                  objectFit: 'cover',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                  marginBottom: '-5px'
                }} 
              />
              <h3 style={{ marginBottom: '10px', fontSize: '1.4rem' }}>{title}</h3>
              <p style={{ fontWeight: '400', fontSize: '1rem', padding: '0 10px', color: '#5b3b3b' }}>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
