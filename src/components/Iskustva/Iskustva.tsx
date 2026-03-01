import React, { useState } from "react";

// Importi assets-a
import slikaOblak from "../../assets/Iskustva/IskustvaOblak.png";
import StrelicaGore from "../../assets/Iskustva/IskustvaStrelica.svg";
import StrelicaDole from "../../assets/Iskustva/IskustvaStrelicaDonja.svg";
import IskustvaKamile from "../../assets/Iskustva/IskustvaKamile.png";
import '../../styles/tailwind.css';

interface Person {
  id: number;
  image: string;
  description: string;
}

const team: Person[] = [
  { id: 1, image: "https://randomuser.me/api/portraits/men/1.jpg", description: "Fokusirani smo na razvoj modernih rešenja koja pomažu korisnicima." },
  { id: 2, image: "https://randomuser.me/api/portraits/women/2.jpg", description: "Dizajn nije samo kako nešto izgleda, već kako funkcioniše. Naš cilj je besprekorno korisničko iskustvo kroz svaki piksel." },
  { id: 3, image: "https://randomuser.me/api/portraits/men/3.jpg", description: "Sigurnost i stabilnost su osnova svakog sistema. Gradimo čvrstu infrastrukturu." },
  { id: 4, image: "https://randomuser.me/api/portraits/women/4.jpg", description: "Kvalitet koda direktno utiče na uspeh. Testiranje osigurava najbolje rezultate." },
  { id: 5, image: "https://randomuser.me/api/portraits/men/5.jpg", description: "Analitika nam pomaže da razumemo tržište i donosimo ispravne odluke." },
];

const Iskustva = () => {
  const [people, setPeople] = useState<Person[]>(team);

  const rotateUp = () => {
    setPeople((prev) => [...prev.slice(1), prev[0]]);
  };

  const rotateDown = () => {
    setPeople((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
  };

  const activePerson = people[2];

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center
      h-[600px] sm:h-[650px] md:h-[750px] lg:h-[800px]"
      style={{
        backgroundColor: "rgba(0, 24, 40, 0.98)",
        backgroundImage:
          "linear-gradient(180deg, rgba(0, 24, 40, 0.98) 0%, rgba(83, 20, 91, 0.4) 80%, rgba(0, 0, 0, 0.5) 100%)",
      }}
    >
      <h2 className = "font-['DuneRise'] font-bold text-4xl md:text-5xl lg:text-6xl text-white text-center absolute top-6">
        Iskustva
      </h2>


      {/* Kamile */}
      <div className="absolute bottom-0 left-0 w-full z-0 leading-[0]">
        <img
          src={IskustvaKamile}
          alt="Kamile"
          className="w-full h-[180px] md:h-auto block"
        />
      </div>

      {/* Kontejner – slider malo više ulevo */}
      <div className="flex flex-row items-center w-full pl-2 pr-6 md:pl-6 md:pr-12 lg:pl-10 lg:pr-24 relative z-10">
        
        {/* Slider */}
        <div className="w-[90px] md:w-[150px] flex-shrink-0 flex flex-col items-center gap-6">
          
          <button
            onClick={rotateUp}
            className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 hover:scale-110 active:scale-90 transition-transform duration-300 cursor-pointer"
          >
            <img src={StrelicaGore} alt="Gore" className="w-8 md:w-12" />
          </button>

          <div className="flex flex-col items-center gap-4">
            {people.map((person, index) => {
              
              let scale = "scale-75 opacity-30";
              
              if (index === 1 || index === 3) {
                scale = "scale-90 opacity-60";
              } else if (index === 2) {
                scale = "scale-110 opacity-100";
              }

              return (
                <div
                  key={person.id}
                  onClick={
                    index < 2
                      ? rotateUp
                      : index > 2
                      ? rotateDown
                      : undefined
                  }
                  className={`
                    w-14 h-14 md:w-24 md:h-24
                    rounded-full overflow-hidden border-2 border-white
                    transition-all duration-500 ease-in-out
                    transform ${scale}
                    cursor-pointer
                  `}
                >
                  <img
                    src={person.image}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={rotateDown}
            className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 hover:scale-110 active:scale-90 transition-transform duration-300 cursor-pointer"
          >
            <img src={StrelicaDole} alt="Dole" className="w-8 md:w-12" />
          </button>
        </div>

        {/* Tekst */}
        <div className="flex-1 relative flex items-center justify-center min-h-[400px]">
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <img
              src={slikaOblak}
              alt="Cloud"
              className="w-full max-w-[650px] h-auto object-contain opacity-20"
            />
          </div>

          <div
            key={activePerson.id}
            className="relative z-10 w-full max-w-3xl px-4 md:px-12 text-center md:text-left transition-opacity duration-500"
          >
            <p className="font-['NotoSans'] text-gray-100 text-[13px] sm:text-base md:text-xl">
              "{activePerson.description}"
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Iskustva;