import '../../styles/Agenda.css'

const Agenda = () => {
    return (
        <div className="agenda-wrapper">

            {/* Naslov */}
            <h1 className="text-5xl font-orbitron text-center mb-12 uppercase tracking-widest">
                Agenda
            </h1>

            <div className="flex justify-between items-center max-w-6xl mx-auto">
                {/* Levi stubovi */}
                <div className="w-1/4">
                    <img src="../assets/agenda/mali_scroll.svg" alt="stubovi" className="drop-shadow-2xl" />
                </div>

                {/* Centralni deo sa mapom */}
                <div className="relative w-1/2 flex justify-center">
                    <img src="/assets/scroll-mapa.png" alt="mapa" />
                    {/* Ovde ćeš posle dodati tekst preko mape koristeći absolute klasu */}
                </div>

                {/* Desni stubovi */}
                <div className="w-1/4">
                    <img src="/assets/stubovi-right.png" alt="stubovi" />
                </div>
            </div>
        </div>
    );
}

export default Agenda;