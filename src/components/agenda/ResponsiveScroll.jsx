import { useState, useEffect } from 'react';

const ResponsiveScroll = ({ desktopImg, mobileImg, className }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <img 
      src={isMobile ? mobileImg : desktopImg} 
      className={className} 
      alt="scroll" 
    />
  );
};

export default ResponsiveScroll;