import React, { useState, useEffect } from 'react';

const GlitchScroll = ({ desktopImg, mobileImg, className, onClick, triggerGlitch }) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        if (triggerGlitch) {
            setIsGlitching(true);
            const timer = setTimeout(() => setIsGlitching(false), 400);
            return () => clearTimeout(timer);
        }
    }, [triggerGlitch]);

    const handleClick = () => {
        setIsGlitching(true);
        if (onClick) onClick();
        setTimeout(() => setIsGlitching(false), 400);
    };

    return (
        <div 
            className={`${className} ${isGlitching ? 'glitch-action' : ''}`} 
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <picture>
                <source media="(max-width: 1024px)" srcSet={mobileImg} />
                <img src={desktopImg} alt="scroll" style={{ width: '100%', height: 'auto' }} />
            </picture>
        </div>
    );
};

export default GlitchScroll;