import { useState, useEffect } from 'react';
import DisciplineSelector from '../components/Prijave/DisciplineSelector';
import StartMenu from '../components/Prijave/StartMenu';
import PrijaveLock from '../components/Prijave/PrijaveLock';

export default function Prijava() {
  const [activeDiscipline, setActiveDiscipline] = useState('fon-hackathon');

  // Force reset on mount
  useEffect(() => {
    setActiveDiscipline('fon-hackathon');
  }, []);

  const handleBlockchainClick = () => {
    window.open('https://forms.office.com/e/PBiJRjUXz2', '_blank');
  };

  // Dinamička pozadina prema aktivnoj disciplini
  const getBackgroundImage = () => {
    if (activeDiscipline === 'fon-hackathon') return "url('/fh-bg.svg')";
    if (activeDiscipline === 'gamejam') return "url('/gj-bg.svg')";
    return "url('/fh-bg.svg')"; // default
  };

  return (
    <div 
      className="relative w-screen min-h-screen bg-center bg-cover bg-no-repeat pb-20" 
      style={{ backgroundImage: getBackgroundImage() }}
    >
      {/* Discipline selector - uvek vidljiv */}
      <div className="pt-24">
        <DisciplineSelector 
          activeDiscipline={activeDiscipline}
          onDisciplineChange={setActiveDiscipline}
          onBlockchainClick={handleBlockchainClick}
        />
      </div>
      
      {/* Forme za prijavu */}
      <div className="flex items-start justify-center w-full pt-8 px-4">
        <PrijaveLock discipline={activeDiscipline}>
          <StartMenu discipline={activeDiscipline} key={activeDiscipline} />
        </PrijaveLock>
      </div>
    </div>
  );
}
