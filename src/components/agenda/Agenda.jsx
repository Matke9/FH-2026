import '../../styles/Agenda.css';
import closedScroll from '../../assets/agenda/mali_scroll.svg';
import openScroll from '../../assets/agenda/otvoreni_veliki_scroll.svg';

const Agenda = () => {
    return (
        <div className="agenda-wrapper">
            {/* Naslov */}
            <h1 className="agenda-title">
                AGENDA
            </h1>

            { /* Deo za scrollove */}
            <div className="flex justify-between items-end max-w-7xl mx-auto w-full px-10">
                <div>
                    
                </div>

                {/* Levi scroll */}
                <div className="closed-scroll">
                    <div className="section-subtitle-side">Web4 challenge</div>
                    <div className="w-48">
                        <img src={closedScroll} alt="left closed scroll" />
                    </div>
                </div>

                {/* Centralni deo sa mapom */}
                <div className="open-scroll">
                    <div className="section-subtitle-center">Hakaton</div>
                    <div className="map-container">
                        <img src={openScroll} alt="mapa" />
                    </div>
                </div>

                {/* Desni scroll */}
                <div className="closed-scroll">
                    <div className="section-subtitle-side">Game jam</div>
                    <div className="w-48">
                        <img src={closedScroll} alt="right closed scroll" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Agenda;