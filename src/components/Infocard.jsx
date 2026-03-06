import React, {useState} from "react";

const InfoCard = ({naslovIznad, naslovIspod, tekstovi, bojaOkvir}) =>{

    const [index, setIndex] = useState(0);

    const sledeciTekst = () => {
        setIndex((prevIndex) => (prevIndex + 1) % tekstovi.length);
    };

    const prethodniTekst = () => {
        setIndex((prevIndex) => (prevIndex - 1 + tekstovi.length) % tekstovi.length);
    };

    return(
        <div className="flex flex-col md:flex-row items-center space-x-2 md:space-x-4 w-full max-w-[1000px]">
            {/* Kontejner koji drži i naslove i okvir */}
            
            <button 
            onClick={prethodniTekst}
            className="hidden md:block text-white text-5xl md:text-7xl cursor-pointer hover:scale-110 transition-transform bg-transparent border-none focus:outline-none active:outline-none select-none">
                &#10094;
            </button>
            
            <div className="relative flex-shrink-0 w-full max-w-[300px] md:max-w-[650px]">
                {/* Gornji naslov */}
                <h2 className="podnaslov-kartice text-4xl md:text-5xl absolute -top-8 left-0">
                    {naslovIznad}
                </h2>

                {/* Okvir */}
                <div className={`w-full px-8 py-24 border-2 border-${bojaOkvir} ${
                    bojaOkvir === 'fon-hackathon' ? 'shadow-[0_0_15px_#6366f1]' : 
                    bojaOkvir === 'gamejam' ? 'shadow-[0_0_15px_#22c55e]' : 
                    'shadow-[0_0_15px_#f59e0b]'
                } bg-transparent mt-8 mb-8 min-h-[400px] flex items-center justify-center`}>
                    <p className="text-white text-center text-lg md:text-xl font-sans leading-relaxed">
                        {tekstovi[index]}
                    </p>
                </div>

                {/* Donji naslov */}
                <h2 className="podnaslov-kartice text-4xl md:text-5xl absolute -bottom-8 right-0">
                    {naslovIspod}
                </h2>
            </div>
            <button 
            onClick={sledeciTekst}
            className="hidden md:block text-white text-5xl md:text-7xl cursor-pointer hover:scale-110 transition-transform bg-transparent border-none focus:outline-none active:outline-none select-none">
                &#10095;
            </button>

            <div className="flex md:hidden justify-between w-full px-10 mt-4">
            <button
                onClick={prethodniTekst}
                className="text-white text-8xl border-none focus:outline-none active:outline-none select-none active:scale-90">
                &#10094;
            </button>

            <button
                onClick={sledeciTekst}
                className="text-white text-8xl border-none focus:outline-none active:outline-none select-none active:scale-90">
                &#10095;
            </button>
            </div>
        </div>
    );
};
export default InfoCard;