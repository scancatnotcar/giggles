import React, { useState, useRef } from 'react';
import Navbar from './navbar';

const Polaroid = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('Your Moment');
  const [error, setError] = useState('');
  const polaroidRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setError('');
        createSparkles();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    const captionText = caption.trim();
    if (!captionText) {
      setError('Please enter a caption before downloading.');
      return;
    }

    try {
      // Create canvas for high-resolution export
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const scale = 3; // High resolution multiplier
    
      canvas.width = 400 * scale;
      canvas.height = 400 * scale;
    
      // Fill background with rounded corners
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      // Add subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(248, 248, 248, 0.3)');
      gradient.addColorStop(1, 'rgba(240, 240, 240, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      // Draw image with proper aspect ratio preservation
      if (image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const imgX = 20 * scale;
          const imgY = 20 * scale;
          const imgWidth = 360 * scale;
          const imgHeight = 280 * scale;
        
          // Calculate aspect ratios
          const imgAspectRatio = img.naturalWidth / img.naturalHeight;
          const targetAspectRatio = imgWidth / imgHeight;
        
          let drawWidth = imgWidth;
          let drawHeight = imgHeight;
          let offsetX = imgX;
          let offsetY = imgY;
        
          // Maintain aspect ratio using object-fit: cover logic
          if (imgAspectRatio > targetAspectRatio) {
            // Image is wider - fit to height and crop width
            drawWidth = imgHeight * imgAspectRatio;
            offsetX = imgX - (drawWidth - imgWidth) / 2;
          } else {
            // Image is taller - fit to width and crop height
            drawHeight = imgWidth / imgAspectRatio;
            offsetY = imgY - (drawHeight - imgHeight) / 2;
          }
        
          // Create clipping path for image area
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(imgX, imgY, imgWidth, imgHeight, 12 * scale);
          ctx.clip();
        
          // Draw image with preserved aspect ratio
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          ctx.restore();
        
          // Draw caption with better font rendering
          ctx.fillStyle = '#776655';
          ctx.font = `${18 * scale}px 'Patrick Hand', cursive`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
        
          // Add text shadow for better readability
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowOffsetX = 1 * scale;
          ctx.shadowOffsetY = 1 * scale;
          ctx.shadowBlur = 2 * scale;
        
          // Handle multi-line text if needed
          const maxWidth = 320 * scale;
          const words = captionText.split(' ');
          let line = '';
          const lines = [];
        
          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
          
            if (testWidth > maxWidth && n > 0) {
              lines.push(line);
              line = words[n] + ' ';
            } else {
              line = testLine;
            }
          }
          lines.push(line);
        
          // Draw text lines
          const lineHeight = 22 * scale;
          const startY = 350 * scale - ((lines.length - 1) * lineHeight) / 2;
        
          lines.forEach((line, index) => {
            ctx.fillText(line.trim(), canvas.width / 2, startY + index * lineHeight);
          });
        
          // Reset shadow
          ctx.shadowColor = 'transparent';
        
          // Download with maximum quality
          canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const filename = captionText.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') || 'polaroid';
            link.download = `${filename}.png`;
            link.click();
            URL.revokeObjectURL(url);
            createSparkles();
          }, 'image/png', 1.0); // Maximum quality
        };
        img.src = image;
      }
    } catch (err) {
      setError('Error generating download. Please try again.');
    }
  };

  const handleReset = () => {
    setImage(null);
    setCaption('Your Moment');
    setError('');
  };

  const createSparkles = () => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.className = 'sparkle';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.fontSize = (Math.random() * 20 + 15) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleAnim 1.5s ease-out forwards';
        document.body.appendChild(sparkle);
      
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.remove();
          }
        }, 1500);
      }, i * 200);
    }
  };

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Patrick+Hand&display=swap');

        @keyframes titleGlow {
          0% { text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
          100% { text-shadow: 0 2px 8px rgba(214, 140, 158, 0.3); }
        }

        @keyframes polaroidAppear {
          0% {
            opacity: 0;
            transform: scale(0.8) rotateY(20deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes sparkleAnim {
          0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(1) rotate(180deg);
          }
        }

        .polaroid-app {
          min-height: 100vh;
          background: linear-gradient(135deg, #faf4ef 0%, #f5ebe0 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Segoe UI', sans-serif;
        }

        .title {
          color: #d68c9e;
          font-size: 3rem;
          font-family: 'Pacifico', cursive;
          margin-bottom: 2rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          animation: titleGlow 3s ease-in-out infinite alternate;
        }

        .upload-btn {
          background: linear-gradient(135deg, #d68c9e 0%, #c07b8f 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(214, 140, 158, 0.5);
          transition: background 0.3s ease;
          user-select: none;
        }
        .upload-btn:hover {
          background: linear-gradient(135deg, #c07b8f 0%, #a75d6f 100%);
        }
        .upload-btn:active {
          box-shadow: 0 2px 7px rgba(214, 140, 158, 0.8);
          transform: scale(0.98);
        }

        input[type="file"] {
          display: none;
        }

        .caption-input {
          margin-top: 1rem;
          padding: 10px 15px;
          font-size: 1.2rem;
          border-radius: 8px;
          border: 2px solid #d68c9e;
          width: 280px;
          font-family: 'Patrick Hand', cursive;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
          transition: border-color 0.3s ease;
        }
        .caption-input:focus {
          border-color: #c07b8f;
          outline: none;
          box-shadow: 0 0 5px #d68c9e;
        }

        .polaroid {
          margin-top: 40px;
          width: 400px;
          height: 400px;
          background: #faf4ef;
          border: 12px solid #fff;
          border-radius: 20px;
          box-shadow:
            0 4px 20px rgba(0, 0, 0, 0.1),
            inset 0 0 15px #ffeaea;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: polaroidAppear 0.8s ease forwards;
          user-select: none;
          position: relative;
        }

        .polaroid img {
          width: 360px;
          height: 280px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(214, 140, 158, 0.15);
          margin-top: 20px;
          user-select: none;
        }

        .caption {
          margin-top: 18px;
          font-family: 'Patrick Hand', cursive;
          font-size: 18px;
          color: #776655;
          text-align: center;
          user-select: text;
          padding: 0 20px;
          white-space: pre-wrap;
          letter-spacing: 1.1px;
          text-shadow:
            1px 1px 1px rgba(255, 255, 255, 0.8);
        }

        .buttons {
          margin-top: 30px;
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .btn {
          padding: 12px 30px;
          border-radius: 12px;
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          color: white;
          background: #d68c9e;
          box-shadow: 0 5px 12px rgba(214, 140, 158, 0.6);
          transition: background 0.3s ease;
          user-select: none;
        }
        .btn:hover {
          background: #c07b8f;
        }
        .btn:active {
          transform: scale(0.97);
          box-shadow: 0 3px 7px rgba(192, 123, 143, 0.9);
        }

        .error {
          margin-top: 12px;
          color: #c74761;
          font-weight: 600;
          font-size: 1rem;
          animation: shake 0.3s linear 0 2 alternate;
        }

        /* Sparkle style */
        .sparkle {
          color: #d68c9e;
          pointer-events: none;
          position: fixed;
          animation: sparkleAnim 1.5s ease forwards;
          user-select: none;
          z-index: 1000;
        }
      `}</style>

      <div className="polaroid-app">
        <h1 className="title">Polaroid Creator</h1>

        <label className="upload-btn" htmlFor="file-upload" tabIndex={0}>
          Upload Image
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          aria-label="Upload your image"
        />

        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter your caption here"
          className="caption-input"
          maxLength={100}
          aria-label="Polaroid caption"
        />

        {error && <div className="error" role="alert">{error}</div>}

        {image && (
          <>
            <div className="polaroid" ref={polaroidRef}>
              <img src={image} alt="Uploaded polaroid" draggable={false} />
              <div className="caption">{caption}</div>
            </div>

            <div className="buttons">
              <button className="btn" onClick={handleDownload} aria-label="Download polaroid image">
                Download
              </button>
              <button className="btn" onClick={handleReset} aria-label="Reset polaroid creator">
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

// Polyfill for roundRect (some browsers do not support)
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
  };
}

export default Polaroid;
