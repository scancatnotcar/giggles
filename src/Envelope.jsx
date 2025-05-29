import React, { useState } from 'react';
import './Envelope.css';

const Envelope = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`envelope-wrapper ${isOpen ? 'open' : ''}`} onClick={toggleEnvelope}>
      <div className="envelope">
        <div className="flap"></div>
        <div className="body"></div>
        <div className="letter">
          <p>{message}</p>
        </div>
      </div>
      <p className="click-tip">{isOpen ? 'Click to close' : 'Click to open'}</p>
    </div>
  );
};

export default Envelope;
