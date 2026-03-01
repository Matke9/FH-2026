import ResponsiveScroll from './ResponsiveScroll.jsx';

import '../../styles/Agenda.css';
import closedScroll from '../../assets/agenda/zatvoren_scroll_1.svg';
import openScroll from '../../assets/agenda/hologram_1.svg';

import closedScrollPhone from '../../assets/agenda/zatvoren_scroll_telefon.svg';
import openScrollPhone from '../../assets/agenda/hologram_telefon.svg';

const Agenda = () => {
    return (
        <div className="agenda-wrapper">
            {/* Naslov */}
            <h1 className="agenda-title">
                AGENDA
            </h1>

            { /* Scrollovi deo */}
            <div className="agenda-content">
                {/* Kolona 1 */}
                <div className="closed-scroll">
                    <h3 className="section-subtitle-side">Web4 challenge</h3>
                    <ResponsiveScroll
                        desktopImg={closedScroll}
                        mobileImg={closedScrollPhone}
                        className="small-scroll"
                    />
                </div>

                {/* Kolona 2 - Centralna */}
                <div className="open-scroll">
                    <h2 className="section-subtitle-center">Hakaton</h2>
                    <ResponsiveScroll
                        desktopImg={openScroll}
                        mobileImg={openScrollPhone}
                        className="big-scroll"
                    />
                </div>

                {/* Kolona 3 */}
                <div className="closed-scroll">
                    <h3 className="section-subtitle-side">Game jam</h3>
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