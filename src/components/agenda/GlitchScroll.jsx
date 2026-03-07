import React, { useState, useEffect, useRef } from 'react';

const GlitchScroll = ({ desktopImg, mobileImg, className, onClick, triggerGlitch }) => {
    const [isGlitching, setIsGlitching] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (triggerGlitch) {
            startGlitch();
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [triggerGlitch]);

    const startGlitch = () => {
        setIsGlitching(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsGlitching(false), 400);
    };

    const handleClick = () => {
        startGlitch();
        if (onClick) onClick();
    };

    return (
        <div 
            className={`${className} ${isGlitching ? 'glitch-action' : ''}`} 
            onClick={handleClick}
            style={{ 
                cursor: 'pointer',
                willChange: 'transform, filter',
                backfaceVisibility: 'hidden'
            }}
        >
            <picture>
                <source media="(max-width: 1024px)" srcSet={mobileImg} />
                <img 
                    src={desktopImg} 
                    alt="scroll" 
                    style={{ 
                        width: '100%', 
                        height: 'auto',
                        display: 'block'
                    }} 
                />
            </picture>
        </div>
    );
};

export default GlitchScroll;