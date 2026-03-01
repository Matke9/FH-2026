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
    
    return (
        <div className="agenda-wrapper">
            {/* Naslov */}
            <h1 className="agenda-title font-dune">
                AGENDA
            </h1>

            { /* Scrollovi deo */}
            <div className="agenda-content">
                {/* Kolona 1 */}
                <div className="closed-scroll">
                    <h3 className="section-subtitle-side font-dune">Web4 challenge</h3>
                    <ResponsiveScroll
                        desktopImg={closedScroll}
                        mobileImg={closedScrollPhone}
                        className="small-scroll"
                    />
                </div>

                {/* Kolona 2 - Centralna */}
                <div className="open-scroll">
                    <h2 className="section-subtitle-center font-dune">Hakaton</h2>
                    <ResponsiveScroll
                        desktopImg={openHakaton}
                        mobileImg={openHakatonPhone}
                        className="big-scroll"
                    />
                </div>

                {/* Kolona 3 */}
                <div className="closed-scroll">
                    <h3 className="section-subtitle-side font-dune">Game jam</h3>
                    <ResponsiveScroll
                        desktopImg={closedScroll}
                        mobileImg={closedScrollPhone}
                        className="small-scroll"
                    />
                </div>
            </div>
        </div>
    );
}

export default Agenda;