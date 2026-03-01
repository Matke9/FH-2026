import { useState } from 'react';
import { straniceHackathon, straniceGameJam} from './features/pravilnik-data';
import svitak from './assets/svitak.svg';
import svitakPhone from './assets/svitakPhone.svg';
import './index.css';
import './styles/Pravilnik.css';

function App() {
  const [index, setIndex] = useState(0);
  const [tema, setTema] = useState('plava');

  const aktivniPodaci = tema === 'plava' ? straniceHackathon: straniceGameJam;

  const sledecaStrana = () => {
    if (index < aktivniPodaci.length - 1) setIndex(index + 1);
  };

  const prethodnaStrana = () => {
    if (index > 0) setIndex(index - 1);
  };

  const toggleTema = () =>{
    setTema(tema === 'plava' ? 'crvena': 'plava');
    setIndex(0);
  };

  return (
    <div className={`pravilnik-page-wrapper tema-${tema}`}>
      <div className='bg-overlay'></div>

      <button className='theme-toggle' onClick={toggleTema}>
        {tema === 'plava' ? 'GAME JAM': 'FON HACKATHON'}
      </button>

      <h1 className='naslov-pravilnik'>
        Pravilnik
      </h1>
      <div className='svitak-container'>
        <img src={svitak} className='svitak-bg desktop-only' alt="scroll" />
        <img src={svitakPhone} className='svitak-bg mobile-only' alt="scroll-mobile" />
        <div className='svitak-boja'></div>
        <div className='svitak-content'>
          <h2 className='podnaslov-pravilnik'>{aktivniPodaci[index].naslov}</h2>
          <p className='tekst-pravilnik'>{aktivniPodaci[index].tekst}</p>
        </div>
      </div>
      <div className='navigacija-pravilnik'>
        <button onClick={prethodnaStrana} className='strelica'>
          {"<<"}
        </button>
        <span className='broj-strane'>
          {index + 1}
        </span>
        <button onClick={sledecaStrana} className='strelica'>
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default App;