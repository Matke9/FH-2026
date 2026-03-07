import { useState, useEffect, useRef } from 'react';
import GlitchScroll from './GlitchScroll.jsx';

import '../../styles/Agenda.css';
import closedScroll from '../../assets/agenda/zatvoren_scroll_1.svg';
import openHakaton from '../../assets/agenda/hakaton_mapa.svg';
import openGamejam from '../../assets/agenda/gamejam_mapa.svg';
import openWeb4 from '../../assets/agenda/web4_mapa.svg';

import closedScrollPhone from '../../assets/agenda/zatvoren_scroll_telefon.svg';
import openHakatonPhone from '../../assets/agenda/hakaton_mapa_telefon.svg';
import openGamejamPhone from '../../assets/agenda/gamejam_mapa_telefon.svg';
import openWeb4Phone from '../../assets/agenda/web4_mapa_telefon.svg';

const Agenda = () => {
    const mobileOrderedItems = [
        { id: 'hakaton', title: 'HAKATON', desk: openHakaton, mob: openHakatonPhone },
        { id: 'gamejam', title: 'GAME JAM', desk: openGamejam, mob: openGamejamPhone },
        { id: 'web4', title: 'WEB4 CHALLENGE', desk: openWeb4, mob: openWeb4Phone }
    ];

    const desktopOrderedItems = [
        { id: 'web4', title: 'WEB4 CHALLENGE', desk: openWeb4, mob: openWeb4Phone },
        { id: 'hakaton', title: 'HAKATON', desk: openHakaton, mob: openHakatonPhone },
        { id: 'gamejam', title: 'GAME JAM', desk: openGamejam, mob: openGamejamPhone }
    ];

    const [activeId, setActiveId] = useState('hakaton');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [glitchingIds, setGlitchingIds] = useState({});
    const [isReady, setIsReady] = useState(true);
    const glitchCounter = useRef(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSwitch = (clickedId) => {
        glitchCounter.current += 1;
        const tick = glitchCounter.current;
        const currentItems = isMobile ? mobileOrderedItems : desktopOrderedItems;

        setIsReady(false);

        if (clickedId === activeId) {
            setGlitchingIds({ [clickedId]: tick });
        } else {
            const allGlitches = {};
            currentItems.forEach(item => {
                allGlitches[item.id] = tick;
            });
            setGlitchingIds(allGlitches);
            setActiveId(clickedId);
        }

        setTimeout(() => {
            setIsReady(true);
        }, 100);
    };

    const currentItems = isMobile ? mobileOrderedItems : desktopOrderedItems;

    return (
        <div className="agenda-wrapper ">
            <h1 className="agenda-title font-dune">AGENDA</h1>
            <div className="agenda-content">
                {currentItems.map((item) => {
                    const isOpen = item.id === activeId;
                    return (
                        <div key={item.id} className={`${isOpen ? "open-scroll" : "closed-scroll"} ${!isReady ? 'layout-hidden' : 'layout-visible'}`}>
                            <h3 className={`font-dune ${isOpen ? 'section-subtitle-center' : 'section-subtitle-side'}`}>
                                {item.title}
                            </h3>
                            <GlitchScroll
                                desktopImg={isOpen ? item.desk : closedScroll}
                                mobileImg={isOpen ? item.mob : closedScrollPhone}
                                className={isOpen ? "big-scroll" : "small-scroll"}
                                onClick={() => handleSwitch(item.id)}
                                triggerGlitch={glitchingIds[item.id] || null}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Agenda;