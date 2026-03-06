import { useState, useEffect } from 'react';
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
    // Pocetni redosled za mobilni prikaz
    const initialItems = [
        { id: 'hakaton', title: 'Hakaton', desk: openHakaton, mob: openHakatonPhone },
        { id: 'gamejam', title: 'Game jam', desk: openGamejam, mob: openGamejamPhone },
        { id: 'web4', title: 'Web4 challenge', desk: openWeb4, mob: openWeb4Phone }
    ];

    const [items, setItems] = useState(initialItems);
    const [activeId, setActiveId] = useState('hakaton');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    // Deo za responzivnost
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSwitch = (clickedId, clickedIndex) => {
        if (isMobile) {
            // MOBILNI + TABLET: Samo otvori kliknuti, ostali se zatvaraju
            setActiveId(clickedId);
        } else {
            // DESKTOP: rotira mape
            if (clickedIndex === 1) return;
            const newItems = [...items];
            if (clickedIndex === 0) {
                const last = newItems.pop();
                newItems.unshift(last);
            } else {
                const first = newItems.shift();
                newItems.push(first);
            }
            setItems(newItems);
        }
    };

    return (
        <div className="agenda-wrapper">
            <h1 className="agenda-title font-dune">AGENDA</h1>

            <div className="agenda-content">
                {items.map((item, index) => {
                    const isOpen = isMobile 
                        ? item.id === activeId 
                        : index === 1;

                    return (
                        <div 
                            key={item.id} 
                            className={isOpen ? "open-scroll" : "closed-scroll"}
                        >
                            <h3 className={`font-dune ${isOpen ? 'section-subtitle-center' : 'section-subtitle-side'}`}>
                                {item.title}
                            </h3>
                            <GlitchScroll
                                desktopImg={isOpen ? item.desk : closedScroll}
                                mobileImg={isOpen ? item.mob : closedScrollPhone}
                                className={isOpen ? "big-scroll" : "small-scroll"}
                                onClick={() => handleSwitch(item.id, index)}
                                triggerGlitch={item.id}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Agenda;