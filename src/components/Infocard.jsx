import React, { useState } from "react";

const InfoCard = ({ naslovIznad, naslovIspod, tekstovi, bojaOkvir }) => {
    const [index, setIndex] = useState(0);

    const sledeciTekst = () => {
        setIndex((prevIndex) => (prevIndex + 1) % tekstovi.length);
    };

    const prethodniTekst = () => {
        setIndex((prevIndex) => (prevIndex - 1 + tekstovi.length) % tekstovi.length);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-[1000px] px-4">
            
            {/* Desktop strelica levo */}
            <button 
                onClick={prethodniTekst}
                className="hidden md:block text-white text-7xl hover:scale-110 transition-transform bg-transparent border-none select-none px-4">
                &#10094;
            </button>
            
            {/* GLAVNI KONTEJNER KARTICE */}
            {/* PROMENA: Smanjen max-w na mobilnom na 85% širine ekrana da naslovi ne bi bežali van viewport-a */}
            <div className="relative w-[85%] sm:w-full max-w-[300px] sm:max-w-[450px] md:max-w-[650px] mx-auto">
                
                {/* GORNJI NASLOV */}
                {/* PROMENA: text-2xl za jako male ekrane, raste do 6xl. whitespace-normal omogućava prelom ako je baš dugo */}
                <h2 className="podnaslov-kartice text-2xl sm:text-4xl md:text-6xl font-bold absolute -top-6 sm:-top-8 md:-top-10 left-0 z-20">
                    {naslovIznad}
                </h2>

                {/* OKVIR */} 
                {/* PROMENA: Smanjen padding (py-12) na mobilnom da kartica ne bude previsoka */}
                <div className={`w-full px-4 sm:px-8 py-12 sm:py-16 md:py-24 border-4 border-${bojaOkvir} ${
                    bojaOkvir === 'fon-hackathon' ? 'shadow-fon-hackathon' : 
                    bojaOkvir === 'gamejam' ? 'shadow-gamejam' : 
                    'shadow-blockchain-challenge'
                } backdrop-blur-md bg-black/20 mt-8 mb-8 min-h-[300px] sm:min-h-[400px] flex items-center justify-center`}>

                    {/* TEKST UNUTAR KARTICE */}
                    {/* PROMENA: text-base na mobilnom, raste do 2xl */}
                    <p className="text-white text-center text-base sm:text-lg md:text-4xl font-sans font-semibold leading-relaxed">
                        {tekstovi[index]}
                    </p>
                </div>

                {/* DONJI NASLOV */}
                <h2 className="podnaslov-kartice text-2xl sm:text-4xl md:text-6xl font-bold absolute -bottom-6 sm:-bottom-8 md:-bottom-10 right-0 z-20">
                    {naslovIspod}
                </h2>
            </div>

            {/* Desktop strelica desno */}
            <button 
                onClick={sledeciTekst}
                className="hidden md:block text-white text-7xl hover:scale-110 transition-transform bg-transparent border-none select-none px-4">
                &#10095;
            </button>

            {/* Mobilne strelice */}
            <div className="flex md:hidden justify-between w-full max-w-[300px] mt-6">
                <button
                    onClick={prethodniTekst}
                    className="text-white text-5xl active:scale-90 select-none">
                    &#10094;
                </button>

                <button
                    onClick={sledeciTekst}
                    className="text-white text-5xl active:scale-90 select-none">
                    &#10095;
                </button>
            </div>
        </div>
    );
};
export default InfoCard;