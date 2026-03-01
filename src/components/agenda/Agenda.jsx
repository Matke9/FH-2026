import React, { useState } from 'react';
import ResponsiveScroll from './ResponsiveScroll.jsx';
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
    // Početno stanje: Niz koji definiše redosled (0=Levo, 1=Sredina, 2=Desno)
    const [items, setItems] = useState([
        { id: 'web4', title: 'Web4 challenge', desk: openWeb4, mob: openWeb4Phone },
        { id: 'hakaton', title: 'Hakaton', desk: openHakaton, mob: openHakatonPhone },
        { id: 'gamejam', title: 'Game jam', desk: openGamejam, mob: openGamejamPhone }
    ]);

    // Postavlja nova stanja
    const handleSwitch = (clickedIndex) => {
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
    };

    return (
        <div className="agenda-wrapper">
            <h1 className="agenda-title font-dune">AGENDA</h1>

            <div className="agenda-content">
                {/* Kolona 1 - LEVO */}
                <div className="closed-scroll">
                    <h3 className="section-subtitle-side font-dune">{items[0].title}</h3>
                    <GlitchScroll
                        desktopImg={closedScroll}
                        mobileImg={closedScrollPhone}
                        className="small-scroll"
                        onClick={() => handleSwitch(0)}
                        triggerGlitch={items[0].id} 
                    />
                </div>

                {/* Kolona 2 - SREDINA */}
                <div className="open-scroll">
                    <h2 className="section-subtitle-center font-dune">{items[1].title}</h2>
                    <GlitchScroll
                        desktopImg={items[1].desk} // Menja se mapa
                        mobileImg={items[1].mob}
                        className="big-scroll"
                        triggerGlitch={items[1].id}
                    />
                </div>

                {/* Kolona 3 - DESNO */}
                <div className="closed-scroll">
                    <h3 className="section-subtitle-side font-dune">{items[2].title}</h3>
                    <GlitchScroll
                        desktopImg={closedScroll}
                        mobileImg={closedScrollPhone}
                        className="small-scroll"
                        onClick={() => handleSwitch(2)}
                        triggerGlitch={items[2].id}
                    />
                </div>
            </div>
        </div>
    );
};

export default Agenda;