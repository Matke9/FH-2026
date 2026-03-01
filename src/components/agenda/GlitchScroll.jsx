import React, { useState } from 'react';

const GlitchScroll = ({ title, type, onClick, isSmall = true }) => {
  const [glitching, setGlitching] = useState(false);

  const handleClick = () => {
    setGlitching(true);
    onClick();
    setTimeout(() => setGlitching(false), 400);
  };

  return (
    <div 
      className={`scroll-unit ${isSmall ? 'small-unit' : 'big-unit'} ${glitching ? 'glitch-run' : ''}`}
      onClick={handleClick}
    >
      <h3 className="font-dune scroll-label">{title}</h3>
      <div className="scroll-wrapper">
        <img 
          src={type === 'open' ? '/map-image.svg' : '/closed-scroll.svg'} 
          className="scroll-img" 
          alt="scroll" 
        />
      </div>
    </div>
  );
};

export default GlitchScroll;