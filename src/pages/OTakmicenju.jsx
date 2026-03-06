import React from "react";
import InfoCard from "../components/Infocard";
import '../styles/OTakmicenju.css';

const OTakmicenju = () =>{

  const fonTekstovi = [
    "Ovo je prvi deo teksta o FON Hakatonu. Ovde piše nešto osnovno.",
    "Ovo je drugi deo teksta o FON Hakatonu. Ovde piše nešto staro.",
    "Ovo je treci deo teksta o FON Hakatonu. Ovde piše nešto novo."
  ];

  const blockchainTekstovi = [
    "Ovo je prvi deo teksta o Blockchainu. Ovde piše nešto osnovno.",
    "Ovo je drugi deo teksta o Blockchainu. Ovde piše nešto staro.",
    "Ovo je treci deo teksta o Blockcahinu. Ovde piše nešto novo."
  ];

  const gameJamTekstovi = [
    "Ovo je prvi deo teksta o Game Jam-u. Ovde piše nešto osnovno.",
    "Ovo je drugi deo teksta o Game Jam-u. Ovde piše nešto staro.",
    "Ovo je treci deo teksta o Game Jam-u. Ovde piše nešto novo."
  ];

  return(
    <div className = "stranica-kontejner pt-32 px-4 md:px-20 flex flex-col items-center">
      <h1 className = "glavni-naslov text-5xl md:text-7xl mb-64">
        O TAKMICENJU
      </h1>

      <div className = "w-full max-w-7xl flex flex-col mt-20">
        {/* Prva kartica - FON HAKATON */}
        <div className="w-full flex justify-start mb-40">
          <InfoCard
            naslovIznad="FON"
            naslovIspod="HAKATON"
            bojaOkvir="fon-hackathon"
            tekstovi={fonTekstovi}
          />
        </div>

        {/* Druga kartica - BLOCKCHAIN CHALLENGE */}
        <div className="w-full flex justify-end mb-40">
          <InfoCard
            naslovIznad="BLOCKCHAIN"
            naslovIspod="CHALLENGE"
            bojaOkvir="blockchain-challenge"
            tekstovi={blockchainTekstovi}
          />
        </div>

        {/* Treća kartica - GAME JAM */}
        <div className="w-full flex justify-start mb-40">
          <InfoCard
            naslovIznad="GAME"
            naslovIspod="JAM"
            bojaOkvir="gamejam"
            tekstovi={gameJamTekstovi}
          />
        </div>
      </div>
    </div>
  );
};

export default OTakmicenju;