import React from 'react';
import StartMenu from '../../../components/Prijave/StartMenu';
import PrijaveLock from '../../../components/Prijave/PrijaveLock';

const GJPrijave = () => {
  return (
    <div className="relative w-screen h-screen bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/gj-bg.png')" }}>
      {/* Glavni kontejner koji centrira sve */}
      <div className="absolute top-0 w-full text-center py-4">
        {/* Naslov */}
        <h1 
          className="text-white text-2xl md:text-3xl lg:text-4xl tracking-[0.2em]" 
          style={{ fontFamily: 'Dune Rise, Montserrat, sans-serif' }}
        >
          FORMA ZA PRIJAVU
        </h1>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <PrijaveLock discipline="gamejam">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl text-center space-y-6">
            {/* StartMenu */}
            <StartMenu discipline="gamejam" />
          </div>
        </PrijaveLock>
      </div>
    </div>
  );
};

export default GJPrijave;